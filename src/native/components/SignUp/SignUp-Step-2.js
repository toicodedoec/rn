import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Form, Item, Label, Input, View, Picker, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../Button';
import Header from './Header';
import Loading from '../Loading';
import Messages from '../Messages';
import Spacer from '../Spacer';
import customStyles from '../../../../native-base-theme/variables/custom';

class SignUpStep2 extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      country: 'AUS',
      postalCode: '',
      errorInputs: {
        firstName: false,
        lastName: false,
        email: false,
        emailInvalid: false,
        password: false,
        passwordLength: false,
        postalCode: false
      }
    };
  }

  componentDidMount() {
    this.props.getCountries()
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    let isInputsValid = this.validateInputFields();

    const formData = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      country: this.state.country,
      coach_id: this.props.coach.id,
      confirm_success_url: '/',
      // timezone: '',
      type: 'Client'
    };

    if (isInputsValid) {
      this.props.onFormSubmit(formData)
        .then(() => Actions.signUpStep3())
        .catch(e => console.log(`Error: ${e}`));

    }
  }

  validateInputFields = () => {
    let errors = {
      firstName: false,
      lastName: false,
      email: false,
      emailInvalid: false,
      password: false,
      passwordLength: false,
      postalCode: false
    };
    const emailRegEx = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    let keys = Object.keys(this.state).filter(k => this.state[k] == '');
    keys.forEach(key => {
      errors[key] = true;
    });

    if (!errors.email) {
      errors.emailInvalid = !emailRegEx.test(this.state.email);
    }

    if (!errors.password) {
      errors.passwordLength = this.state.password.length < 8
    }

    this.setState({ errorInputs: errors });
    return keys.length == 0;
  }

  render() {
    const { loading, error, countries } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container style={customStyles.mainBackground}>
        <Header content='Creat an account' stepNo={2} />
        <Content padder style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Spacer size={10} />
          {error && <Messages message={error} />}
          <Spacer size={10} />
          <Form>
            <Item stackedLabel style={customStyles.inputContainer}>
              <Label style={customStyles.inputTitle}>First Name</Label>
              <Input
                onChangeText={v => this.handleChange('firstName', v)}
                style={customStyles.input}
                value={this.state.firstName}
              />
              <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.firstName ? 'flex' : 'none' }]}>Please enter this field</Text>
            </Item>

            <Item stackedLabel style={customStyles.inputContainer}>
              <Label style={customStyles.inputTitle}>Last Name</Label>
              <Input
                onChangeText={v => this.handleChange('lastName', v)}
                style={customStyles.input}
                value={this.state.lastName}
              />
              <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.lastName ? 'flex' : 'none' }]}>Please enter this field</Text>
            </Item>

            <Item stackedLabel style={customStyles.inputContainer}>
              <Label style={customStyles.inputTitle}>Email address</Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
                style={customStyles.input}
                autoCorrect={false}
                value={this.state.email}
              />
              <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.email ? 'flex' : 'none' }]}>Please enter this field</Text>
              <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.emailInvalid ? 'flex' : 'none' }]}>Invalid email</Text>
            </Item>

            <Item stackedLabel style={customStyles.inputContainer}>
              <Label style={customStyles.inputTitle}>Password(min 8 characters)</Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
                style={customStyles.input}
              />
              <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.password ? 'flex' : 'none' }]}>Please enter this field</Text>
              <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.passwordLength ? 'flex' : 'none' }]}>Password is not long enough (min 8 characters)</Text>
            </Item>

            <Item stackedLabel style={customStyles.inputContainer}>
              <Label style={customStyles.inputTitle}>Location</Label>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <Picker
                  mode="dropdown"
                  iosHeader="Select country"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: 150, backgroundColor: '#fff', marginTop: 10, height: 50 }}
                  selectedValue={this.state.country}
                  onValueChange={(value) => this.setState({ country: value })}
                >
                  {countries.map(c => <Item label={c[0]} value={c[0]} key={c[1]} />)}

                </Picker>
                <Input
                  onChangeText={v => this.handleChange('postalCode', v)}
                  style={[customStyles.input, { flex: 1 }]}
                  value={this.state.postalCode}
                />
              </View>
              <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.postalCode ? 'flex' : 'none' }]}>Please enter this field</Text>
            </Item>
          </Form>

          <Spacer size={20} />
        </Content>
        <View style={Styles.bottom}>
          <Button onPress={this.handleSubmit} content="Next Step" />
        </View>
      </Container >
    );
  }
}

export default SignUpStep2;

const Styles = StyleSheet.create({
  bottom: {
    marginBottom: 30,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15
  }
})
