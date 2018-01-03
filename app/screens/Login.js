import React from 'react';
// import { Header, Content, Form, Item, Input, Button, Text } from 'native-base';
import { StatusBar } from 'react-native';
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
    dispatch: PropTypes.func,
  };

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
      </Container>
    );
  }
}

export default connect()(Login);
