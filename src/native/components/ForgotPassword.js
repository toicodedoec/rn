import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Form, Item, Label, Input, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import Loading from './Loading';
import Messages from './Messages';
import Button from './Button';
import Spacer from './Spacer';
import Styles from '../../../native-base-theme/variables/custom';

class ForgotPassword extends React.Component {
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

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    if (this.state.email) {
      this.props.onFormSubmit(this.state)
        .then((response) => console.log(response.json()))
        .catch(e => console.log(`Error: ${e}`));
    }
  }

  render() {
    const { loading, error } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container style={Styles.mainBackground}>
        <Content padder style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Spacer size={100} />
          <Text style={Styles.screenTitle}>Reset your password</Text>
          <Spacer size={40} />
          <Form>
            <Item stackedLabel style={Styles.inputContainer}>
              <Label style={Styles.inputTitle}>Email</Label>
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
            <Spacer size={10} />
            {error && <Messages message={error} />}
            <Spacer size={10} />
            <Button onPress={this.handleSubmit} content="Reset Password" />
          </Form>
        </Content>
      </Container>
    );
  }
}

export default ForgotPassword;
