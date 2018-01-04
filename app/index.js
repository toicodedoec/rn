import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Navigator from './config/routes';
import { Provider } from 'react-redux';
import Login from './screens/Login';
import store from './config/store';

EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $white: '#ffffff',
  $border: '#e2e2e2',
  $inputText: '#797979',
  $lightGrey: '#f0f0f0',
  $darkText: '#343434',
});

export default () => (
  <Provider store={store} >
    <Navigator />
  </Provider>
);
