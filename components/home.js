import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShowData from './showData';
import Login from './login';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <ShowData/> */}
        <Login/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5FCFF',
  }
});
