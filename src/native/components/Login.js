import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Item, Label, Input, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet } from 'react-native';
import Loading from './Loading';
import Messages from './Messages';
import Button from './Button';
import Spacer from './Spacer';
import Styles from '../../../native-base-theme/variables/custom';

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    member: {},
  }

  componentDidMount() {
    this.props.resetStatus();
    // this.setState({
    //   email: 'superman@krypton.com',
    //   password: 'superpower'
    // });
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    Actions.tabbar()
    // this.props.onFormSubmit(this.state)
    //   .then(() => Actions.tabbar())
    //   .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container style={Styles.mainBackground}>
        <Content padder style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Image
            source={require('./../../images/me2-logo-white.png')}
            style={Styles.mainLogo}
          />
          <Spacer size={30} />
          <Text style={Styles.screenTitle}>Log in to continue</Text>
          <Spacer size={40} />
          <Form>
            <Item stackedLabel style={Styles.inputContainer}>
              <Label style={Styles.inputTitle}>Email address</Label>
              <Input
                autoCapitalize="none"
                placeholder='Email address'
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
                style={Styles.input}
                placeholderTextColor="#ddd"
              />
            </Item>
            <Item stackedLabel style={Styles.inputContainer}>
              <Label style={Styles.inputTitle}>Password</Label>
              <Input
                placeholder='Password'
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
                style={Styles.input}
                placeholderTextColor="#ddd"
              />
            </Item>
            <Spacer size={10} />
            {error && <Messages message={error} />}
            <Spacer size={10} />

            <Button onPress={this.handleSubmit} content="Login" />
          </Form>
        </Content>
        <Text
          style={{
            marginBottom: 20,
            color: '#35d1a3',
            height: 40,
            textAlign: 'center'
          }}
          onPress={() => {
            Actions.forgotPassword()
          }}
        >Forgot your password</Text>
      </Container>
    );
  }
}

export default Login;