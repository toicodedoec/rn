import React from 'react';
import { Actions, Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import WelcomeContainer from '../../containers/Welcome';
import WelcomeComponent from '../components/Welcome';

import SignUpStep0Container from '../../containers/SignUp/SignUp-Step-0';
import SignUpStep0Component from '../components/SignUp/SignUp-Step-0';

import SignUpStep1Container from '../../containers/SignUp/SignUp-Step-1';
import SignUpStep1Component from '../components/SignUp/SignUp-Step-1';

import SignUpStep2Container from '../../containers/SignUp/SignUp-Step-2';
import SignUpStep2Component from '../components/SignUp/SignUp-Step-2';

import SignUpStep3Container from '../../containers/SignUp/SignUp-Step-3';
import SignUpStep3Component from '../components/SignUp/SignUp-Step-3';

import SignUpStep4Container from '../../containers/SignUp/SignUp-Step-4';
import SignUpStep4Component from '../components/SignUp/SignUp-Step-4';

import SignUpStep5Container from '../../containers/SignUp/SignUp-Step-5';
import SignUpStep5Component from '../components/SignUp/SignUp-Step-5';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import AppContainer from '../../containers/App';
import ProfileComponent from '../components/Profile';

import AboutComponent from '../components/About';

import Colors from '../../../native-base-theme/variables/commonColor';

// react-navigation

const Index = (
  <Stack hideNavBar>
    <Stack>
      <Scene hideNavBar
        key="welcome"
        title="Welcome"
        component={WelcomeContainer}
        Layout={WelcomeComponent}
      />
      <Scene hideNavBar
        key="signUpStep0"
        title=""
        {...DefaultProps.navbarProps}
        component={SignUpStep0Container}
        Layout={SignUpStep0Component}
      />
      <Scene hideNavBar
        key="signUpStep1"
        title=""
        {...DefaultProps.navbarProps}
        component={SignUpStep1Container}
        Layout={SignUpStep1Component}
      />
      <Scene hideNavBar
        key="signUpStep2"
        title=""
        {...DefaultProps.navbarProps}
        component={SignUpStep2Container}
        Layout={SignUpStep2Component}
      />
      <Scene hideNavBar
        key="signUpStep3"
        title=""
        {...DefaultProps.navbarProps}
        component={SignUpStep3Container}
        Layout={SignUpStep3Component}
      />
      <Scene hideNavBar
        key="signUpStep4"
        title=""
        {...DefaultProps.navbarProps}
        component={SignUpStep4Container}
        Layout={SignUpStep4Component}
      />
      <Scene hideNavBar
        key="signUpStep5"
        title=""
        {...DefaultProps.navbarProps}
        component={SignUpStep5Container}
        Layout={SignUpStep5Component}
      />
    </Stack>
    <Stack>
      <Scene
        key="login"
        title=""
        renderBackButton={() => " "}
        {...DefaultProps.navbarProps}
        component={LoginContainer}
        Layout={LoginComponent}
      />
      <Scene
        back
        key="forgotPassword"
        title=""
        renderBackButton={() =>
          renderBackButton()
        }
        {...DefaultProps.navbarProps}
        component={ForgotPasswordContainer}
        Layout={ForgotPasswordComponent}
      />
    </Stack>
    <Stack>
      <Scene hideNavBar>
        <Tabs
          key="tabbar"
          swipeEnabled
          type="replace"
          {...DefaultProps.tabProps}
        >
          <Stack
            key="home"
            title='Home'
            icon={() => <Icon name="md-walk" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene
              key="home"
              component={AboutComponent}
            />
          </Stack>

          <Stack
            key="progress"
            title="Progress"
            icon={() => <Icon name="book" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene
              key="progress"
              component={RecipesContainer}
              Layout={RecipesComponent}
            />
          </Stack>

          <Stack
            key="more"
            title=""
            icon={() => <Icon name="book" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="coach" component={RecipesContainer} Layout={RecipesComponent} />
          </Stack>

          <Stack
            key="coach"
            title="Coach"
            icon={() => <Icon name="md-chatboxes" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="coach" component={RecipesContainer} Layout={RecipesComponent} />
          </Stack>

          <Stack
            key="profile"
            title="Me"
            icon={() => <Icon name="contact" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="profileHome" component={AppContainer} Layout={ProfileComponent} />
            <Scene
              back
              key="updateProfile"
              title="UPDATE PROFILE"
              {...DefaultProps.navbarProps}
              component={UpdateProfileContainer}
              Layout={UpdateProfileComponent}
            />
          </Stack>
        </Tabs>
      </Scene>

      <Scene
        back
        clone
        key="recipe"
        title="RECIPE"
        {...DefaultProps.navbarProps}
        component={RecipesContainer}
        Layout={RecipeViewComponent}
      />
    </Stack>
  </Stack>
);

export default Index;

const renderBackButton = () => (
  <TouchableOpacity
    onPress={() => {
      // resetStatus().then();
      Actions.pop();
    }}
  >
    <Text style={backStyles.back}>
      <Icon name="arrow-back" style={backStyles.iconBack} />
      &nbsp;Back
    </Text>
  </TouchableOpacity>
);

const backStyles = StyleSheet.create({
  back: {
    color: Colors.brandPrimary,
    fontSize: 16
  },
  iconBack: {
    fontSize: 16,
    marginRight: 15,
    paddingRight: 15,
    color: Colors.brandPrimary
  }
});