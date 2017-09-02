/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Home from './components/home';

export default class firebaseApp extends Component {
  render() {
    return (
      <Home/>
    );
  }
}

AppRegistry.registerComponent('firebaseApp', () => firebaseApp);
