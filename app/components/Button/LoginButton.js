import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';

const LoginButton = ({ text, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <Text>{text}</Text>
  </TouchableHighlight>
);

LoginButton.propTypes = ({
  text: PropTypes.string,
  onPress: PropTypes.func,
});

export default LoginButton;

