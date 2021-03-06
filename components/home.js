import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShowData from './showData';
import AddPage from './addPage';
import Login from './login';
import { Router, Scene } from 'react-native-router-flux';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <ShowData/> */}
        <Router sceneStyle={styles.scenes}>
            <Scene key="root">
                <Scene key="login" component={Login} initial="true" hideNavBar="true" />
                <Scene key="home" component={ShowData} title="Home" />
                <Scene key="add" component={AddPage} title="Upload new object" />
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
  },
  scenes:{
      backgroundColor: 'white'
  }
});
