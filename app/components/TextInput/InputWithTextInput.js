import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const InputWithTextInput = ({ text, secureEntry = false }) => (
  <View style={styles.container}>
    <Text>{text}</Text>
    <TextInput secureTextEntry={secureEntry} style={styles.input} />
  </View>
);

InputWithTextInput.propTypes = ({
  text: PropTypes.string,
  secureEntry: PropTypes.bool,
});

export default InputWithTextInput;
