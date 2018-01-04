import React from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import { Container } from '../components/Container';
import { LoginButton } from '../components/Button';
import { login } from '../actions/user';
import { User } from '../model/user';

const { Form: FormData } = t.form;

class Login extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    userID: PropTypes.number,
    errorMessage: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userID && nextProps.userID > 0) {
      this.props.navigation.navigate('Home');
    }
    /* handle error message */
    console.log('Login error:', nextProps.errorMessage);
  }

  handleLoginPress = () => {
    this.props.dispatch(login(JSON.stringify(this.form.getValue())));
  };

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <FormData
          ref={(c) => { this.form = c; }}
          type={User}
        />
        <LoginButton text="Login" onPress={() => this.handleLoginPress()} />
        <Text>user:{this.props.userID}</Text>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const userID = state.user.userId;
  const errorMessage = state.user.error;
  return {
    userID,
    errorMessage,
  };
};
export default connect(mapStateToProps)(Login);
