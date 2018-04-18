import React from 'react';
import PropTypes from 'prop-types';
import { Body, Container, Content, Text, Icon, View, Form, Item, Picker, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, ScrollView } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import Colors from '../../../../native-base-theme/variables/commonColor';
import Button from '../Button';
import Header from './Header';
import Loading from '../Loading';
import Spacer from '../Spacer';
import customStyles from '../../../../native-base-theme/variables/custom';

class SignUpStep3 extends React.Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            countryName: '',
            phoneNumber: '',
            phoneCode: '',
            phoneInValid: false,
            phoneSent: false,
            verifiedCode: ''
        }
    }

    componentDidMount() {console.log(this.props);
        let country = this.props.countries.filter(c => c[0] == this.props.user.country);
        this.setState({
            phoneCode: country.length ? country[0][1] : "",
            countryName: country.length ? country[0][2] : "",
        })
    }

    handleChange = (name, val) => {
        this.setState({
            ...this.state,
            [name]: val,
        });
    }

    onChangeLocation = (value) => {
        const user = this.state.user;
        this.setState({
            user: Object.assign({}, user, { country: user.country }),
            phoneCode: value[1]
        });
    }

    handleSubmit = () => {
        Actions.signUpStep4();
    }

    onSendPhoneNumber = () => {
        const phoneRegEx = /^\+[1-9]{1,4}[0-9]{3,14}$/;
        const { phoneCode, phoneNumber } = this.state;
        if (!phoneRegEx.test(`+${phoneCode}${phoneNumber}`)) {
            this.setState({ phoneInValid: true });
            return;
        }

        let user = Object.assign({}, this.state.user, { mobile_number: `+${phoneCode}${phoneNumber}` });
        this.props.updatePhoneNumber(user, user.auth_token)
            .then(() => this.setState({ phoneInValid: false, phoneSent: true }))

    }

    onFullfillCode = (code) => {
        this.setState({ verifiedCode: code })
    }

    onVerifyCode = () => {
        this.props.sendVerifiedCode(this.props.user.id, { 'verification_code': this.state.verifiedCode }, this.props.user.auth_token)
            .then(() => Actions.signUpStep4())
    }

    resendCode = () => {
        this.props.resendVerifyCode(this.props.user.id, this.props.user.auth_token);
    }

    render() {
        const { loading, countries } = this.props;

        const enterPhoneNumberUI = <Content padder style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Spacer size={100} />
            <Text style={[Styles.title, Styles.title_small]}>Enter your number</Text>
            <Spacer size={30} />
            <Form>
                {/* <Picker
                    mode="dropdown"
                    iosHeader="Select country"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    style={{ width: '100%', backgroundColor: '#fff', marginTop: 10, height: 50, borderRadius: 0 }}
                    selectedValue={this.state.user.country}
                    onValueChange={(value) => this.onChangeLocation(value)}
                >
                    {countries.map(c => <Item label={c[2]} value={[c[0], c[1]]} key={c[1]} />)}

                </Picker> */}
                <Item stackedLabel style={[customStyles.inputContainer, {  }]}>
                    <Input
                        style={[customStyles.input, { marginTop: 0, borderRadius: 0 }]}
                        value={this.state.countryName}
                        editable={false}
                    />
                    <View style={{ flexDirection: 'row', width: '100%', borderTopWidth: 1, borderTopColor: '#ddd' }}>
                        <Input
                            style={[customStyles.input, { width: 60, flex: 0, marginTop: 0, borderRadius: 0, borderRightWidth: 1, borderRightColor: '#ddd' }]}
                            onChangeText={v => this.handleChange('phoneCode', v)}
                            value={`+${this.state.phoneCode}`}
                            editable={false}
                        />
                        <Input
                            onChangeText={v => this.handleChange('phoneNumber', v)}
                            style={[customStyles.input, { flex: 1, marginTop: 0, borderRadius: 0 }]}
                            placeholder='Phone Number'
                            placeholderTextColor='#ddd'
                        />
                    </View>
                    <Text style={[customStyles.inputErrorMsg, { display: this.state.phoneInValid ? 'flex' : 'none' }]}>Incorrect format</Text>
                </Item>
            </Form>
        </Content>

        const verifyCodeUi = <Content padder style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Spacer size={100} />
            <Text style={[Styles.title, Styles.title_small]}>Verify your code</Text>
            <Spacer size={30} />
            <Text style={{ color: Colors.inverseTextColor, textAlign: 'center' }}>Please type verification we sent to</Text>
            <Spacer size={10} />
            <Text style={{ color: Colors.inverseTextColor, textAlign: 'center' }}>{`+${this.state.phoneCode}${this.state.phoneNumber}`}</Text>
            <Spacer size={20} />
            <CodeInput
                codeLength={6}
                ref="codeInputRef1"
                autoFocus={true}
                ignoreCase={true}
                inputPosition='center'
                className={'border-b'}
                size={40}
                onFulfill={(code) => this.onFullfillCode(code)}
                containerStyle={{ marginTop: 20 }}
                space={5}
            />

        </Content>

        // Loading
        if (loading) return <Loading />;

        return (
            <Container style={customStyles.mainBackground}>
                <Header content='Verification' stepNo={3} />
                {this.state.phoneSent ? verifyCodeUi : enterPhoneNumberUI}
                <View style={[Styles.bottom, { display: this.state.phoneSent ? 'none' : 'flex' }]}>
                    <Button onPress={this.onSendPhoneNumber} content="Send my Me2 code" />
                </View>
                <View style={[Styles.bottom, { display: this.state.phoneSent ? 'flex' : 'none' }]}>
                    <Button onPress={this.onVerifyCode} content="Verify my mobile number" />
                    <Text style={Styles.bottomText} >Didn't receive code? <Text style={{ color: Colors.brandPrimary, fontSize: 14 }} onPress={this.resendCode}>Resend</Text></Text>
                </View>
            </Container >
        );
    }

}
export default SignUpStep3;

const Styles = StyleSheet.create({
    title: {
        color: Colors.inverseTextColor,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 28
    },
    title_small: {
        marginTop: 20,
        fontSize: 20
    },
    bottom: {
        marginBottom: 30,
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15
    },
    bottomText: {
        marginTop: 20,
        fontSize: 14,
        color: '#fff',
        textAlign: 'center'
    }
})