import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import Styles from '../../../native-base-theme/variables/custom';

const Button = ({ content, onPress, width }) => (
    <TouchableOpacity onPress={() => onPress()} style={[Styles.button, { width: width ? width : '100%' }]} >
        <Text style={Styles.buttonText}>{content}</Text>
    </TouchableOpacity>
);

Button.propTypes = {
    content: PropTypes.string,
};

export default Button;
