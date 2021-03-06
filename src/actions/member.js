import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import memberService from '../services/member.services';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import memberDataParser from '../parser/member.data.parser';

/**
  * Sign Up to Firebase
  */
export function signUp(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });
    if (!password2) return reject({ message: ErrorMessages.missingPassword });
    if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // Send user details to Firebase database
        if (res && res.uid) {
          FirebaseRef.child(`users/${res.uid}`).set({
            firstName,
            lastName,
            signedUp: Firebase.database.ServerValue.TIMESTAMP,
            lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
          }).then(() => statusMessage(dispatch, 'loading', false).then(resolve));
        }
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Get this User's Details
  */
async function getUserData(dispatch, userId) {
  let memberDto = await memberService.getUserData(userId);
  return dispatch({
    type: 'USER_DETAILS_UPDATE',
    data: memberDto
  });
}

/**
  * Login to Firebase with Email/Password
  */
export function login(formData) {
  const {
    email,
    password,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    // Call API /appUsers/login
    let loginInfo = await memberService.login(
      {
        "email": email,
        "password": password
      }
    );
    // Set token to asyncStorage
    await AsyncStorage.setItem("authToken", loginInfo.data.id);
    // Get User Data
    let userData = await memberService.getUserData(loginInfo.data.userId);
    await statusMessage(dispatch, 'loading', false);
    return resolve(dispatch({
      type: 'USER_LOGIN',
      data: userData
    }));
  });
}

/**
  * Reset Password
  */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });

    await statusMessage(dispatch, 'loading', true);

    return memberService.resetPassword(formData)
      .then((res) => statusMessage(dispatch, 'loading', false).then(resolve(res)))
      .catch(reject);
  }).catch(async (err) => {
    const error = err.response.data.errors[0].split('_').join(' ');
    await statusMessage(dispatch, 'error', error); throw error;
  });
}

/**
  * Update Profile
  */
export function updateProfile(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    changeEmail,
    changePassword,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingFirstName });

    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (changeEmail) {
      if (!email) return reject({ message: ErrorMessages.missingEmail });
    }
    if (changePassword) {
      if (!password) return reject({ message: ErrorMessages.missingPassword });
      if (!password2) return reject({ message: ErrorMessages.missingPassword });
      if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });
    }

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return FirebaseRef.child(`users/${UID}`).update({ firstName, lastName })
      .then(async () => {
        // Update Email address
        if (changeEmail) {
          await Firebase.auth().currentUser.updateEmail(email).catch(reject);
        }

        // Change the password
        if (changePassword) {
          await Firebase.auth().currentUser.updatePassword(password).catch(reject);
        }

        // Update Redux
        await getUserData(dispatch);
        await statusMessage(dispatch, 'success', 'Profile Updated');
        resolve();
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => new Promise((resolve, reject) => {
    Firebase.auth().signOut()
      .then(() => {
        dispatch({ type: 'USER_RESET' });
        Actions.reset('login');
        // Actions.login();
        setTimeout(resolve, 1000); // Resolve after 1s so that user sees a message
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

export function resetStatus() {

  return dispatch => new Promise(async (resolve, reject) => {

    await statusMessage(dispatch, 'loading', false)
    return resolve(null);
    //   return memberService.resetPassword(formData)
    //     .then((res) => statusMessage(dispatch, 'loading', false).then(resolve(res)))
    //     .catch(reject);
    // }).catch(async (err) => {
    //   const error = err.response.data.errors[0].split('_').join(' ');
    //   await statusMessage(dispatch, 'error', error); throw error;
  });
}

/**
  * create user
  */
export function createUser(formData) {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    return memberService.createUser(formData)
      .then(response =>
        statusMessage(dispatch, 'loading', false)
          .then(resolve(dispatch({
            type: 'CREATE_USER_SUCCESSFULLY',
            data: response.data.data
          })))
      )
      .catch(async (err) => {
        const error = err.response.data.errors.full_messages[0];
        await statusMessage(dispatch, 'error', error); throw error;
      });
  })
}

/**
  * update phone number
  */
export function updatePhoneNumber(user, auth_token) {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);
    return memberService.updatePhoneNumber(user, auth_token)
      .then(response =>
        statusMessage(dispatch, 'loading', false)
          .then(resolve(null))
      )
      .catch(err => err);
  })
}

/**
  * resend code
  */
export function resendVerifyCode(userId, auth_token) {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);
    return memberService.resendVerifyCode(userId, auth_token)
      .then(response =>
        statusMessage(dispatch, 'loading', false)
          .then(resolve(null))
      )
      .catch(err => err);
  })
}

/**
  * send verified code
  */
export function sendVerifiedCode(userId, formData, auth_token) {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);
    return memberService.sendVerifiedCode(userId, formData, auth_token)
      .then(response =>
        statusMessage(dispatch, 'loading', false)
          .then(resolve(null))
      )
      .catch(err => err);
  })
}

/**
  * save user info
  */
export function saveUserInfo(userId, data, auth_token) {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);
    return memberService.saveUserInfo(userId, data, auth_token)
      .then(response =>
        statusMessage(dispatch, 'loading', false)
          .then(resolve(null))
      )
      .catch(err => err);
  })
}