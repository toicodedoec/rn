import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, H2, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet } from 'react-native';
import Button from '../Button';
import Loading from '../Loading';
import Spacer from '../Spacer';
import Colors from '../../../../native-base-theme/variables/commonColor';
import customStyles from '../../../../native-base-theme/variables/custom';

class SignUpStep5 extends React.Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired
    }

    onPress = () => {
        Actions.login();
    }

    render() {
        const { loading } = this.props;

        // Loading
        if (loading) return <Loading />;

        return (
            <Container style={customStyles.mainBackground}>
                <Content padder style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Spacer size={120} />
                    <H2 style={Styles.title}>Welcome to</H2>
                    <Image
                        source={require('../../../images/me2-logo-white.png')}
                        style={customStyles.mainLogo}
                    />
                    <Text style={[Styles.title, Styles.title_small]}>The power of you</Text>
                    <Spacer size={150} />
                    <Button onPress={this.onPress} content="Let's do this!" />
                </Content>
            </Container>
        );
    }
}

export default SignUpStep5;

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