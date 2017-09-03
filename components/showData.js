import React from 'react';
import { FlatList, Text,  View, StyleSheet } from 'react-native';
import firebase from './firebase';
import RowData from './rowData';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';

export default class ShowData extends React.Component {
    constructor(props) {
        super(props);
        this.ref = null;
        this.state = {
            list: [],
        };
        
    }
    
    // Load the Todos on mount
    componentDidMount() {
        this.ref = firebase.database().ref('list');
        this.ref.on('value', this.handleToDoUpdate);
        firebase.messaging().getToken()
        .then((token) => {
          console.log('Device FCM Token: ', token);
        });
    }
    
    // Unsubscribe from the todos on unmount
    componentWillUnmount() {
        if (this.ref) {
            this.ref.off('value', this.handleToDoUpdate);
        }
    }
    
    // Handle ToDo updates
    handleToDoUpdate = (snapshot) => {
        this.list = snapshot.val() || {};
        this.list = Object.keys(this.list).map((k) => this.list[k])
        console.log(this.list);
        this.setState({
            list: this.list,
        });
    }
    
    // Render a ToDo row
    _rowRender(props) {
        
        return (
            <RowData {...props} />
        );
    }
    
    // Render the list of ToDos with a Button
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                data={this.state.list}
                renderItem={this._rowRender}
                />
                <ActionButton buttonColor="rgba(231,76,60,1)" onPress={Actions.add}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})