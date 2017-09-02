import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShowData from './showData';
import Login from './login';
import { Router, Scene } from 'react-native-router-flux';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <ShowData/> */}
        <Router>
            <Scene key="root">
                <Scene key="login" component={Login} title="Login" initial="true" />
                <Scene key="home" component={Home}/>
            </Scene>
        </Router>
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
