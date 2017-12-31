import React from 'react';
// import { Header, Content, Form, Item, Input, Button, Text } from 'native-base';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import { Container } from '../components/Container';
import { InputWithTextInput } from '../components/TextInput';
import { LoginButton } from '../components/Button';
import { login } from '../actions/user';
import { User } from '../model/user';

const Form = t.form.Form;

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  handleLoginPress = () => {
    this.props.dispatch(login(JSON.stringify(this.refs.form.getValue())));
  };

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <Form
          ref='form'
          type={User}
        />
        <LoginButton text="Login" onPress={() => this.handleLoginPress()} />
      </Container>
    );
  }
}

export default connect()(Login);
