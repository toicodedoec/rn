import Color from './commonColor';
import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    mainLogo: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: 100
    },
    inputContainer: {
        marginLeft: 0, 
        borderBottomWidth: 0, 
        marginTop: 5,
        marginBottom: 10
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    },
    inputTitle: {
        color: '#fff'
    },
    inputErrorMsg: {
        color: 'red', 
        alignSelf: 'flex-start', 
        marginTop: 5,
        fontSize: 12
    },
    screenTitle: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: Color.brandPrimary,
        padding: 20,
        borderRadius: 5
    },
    buttonText: {
        color: Color.inverseTextColor,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    mainBackground: {
        backgroundColor: Color.brandDark
    }
});