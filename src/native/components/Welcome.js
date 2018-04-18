import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, H2, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet } from 'react-native';
import Button from './Button';
import Loading from './Loading';
import Spacer from './Spacer';
import Colors from '../../../native-base-theme/variables/commonColor';
import customStyles from '../../../native-base-theme/variables/custom';

class Welcome extends React.Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired
    }

    onPress = () => {
        Actions.signUpStep0();
    }

    render() {
        const { loading } = this.props;
        const termsOfService =
            <Text
                style={{ color: '#35d1a3', fontSize: 13 }}
                onPress={() => { Actions.forgotPassword() }}>
                Terms of service</Text>;

        const policy = <Text
            style={{ color: '#35d1a3', fontSize: 13 }}
            onPress={() => { Actions.forgotPassword() }}>
            Privacy Policy</Text>

        const login = <Text
            style={{ color: '#35d1a3', fontSize: 15 }}
            onPress={() => { Actions.login() }}>
            Login</Text>

        // Loading
        if (loading) return <Loading />;

        return (
            <Container style={customStyles.mainBackground}>
                <Content padder style={{ flex: 1 }}>
                    <Spacer size={120} />
                    <H2 style={Styles.title}>Welcome to</H2>
                    <Image
                        source={require('./../../images/me2-logo-white.png')}
                        style={customStyles.mainLogo}
                    />
                    <Text style={[Styles.title, Styles.title_small]}>The power of you</Text>
                    <Spacer size={100} />
                </Content>
                <View style={{ height: 250, padding: 30, marginBottom: 10 }}>
                    <Button onPress={this.onPress} content="Get started" />
                    <Text style={[Styles.title, Styles.title_small, { fontSize: 15, marginTop: 20 }]}>Already have an account? {login}</Text>
                    <Text
                        style={{
                            marginBottom: 10,
                            marginTop: 70,
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: 13
                        }}
                        onPress={() => {
                            Actions.forgotPassword()
                        }}
                    >By continuing, you agree to Mesquared's {termsOfService} and {policy}</Text>
                </View>
            </Container>
        );
    }
}

export default Welcome;

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
    }
})