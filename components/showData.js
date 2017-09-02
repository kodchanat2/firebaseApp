import React from 'react';
import { ListView, Text,  View } from 'react-native';
import firebase from './firebase';
import RowData from './rowData';

export default class ShowData extends React.Component {
    constructor(props) {
        super(props);
        this.ref = null;
        this.listView = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        
        this.state = {
            list: this.listView.cloneWithRows({}),
        };
        
        // Keep a local reference of the TODO items
        this.list = {};
    }
    
    // Load the Todos on mount
    componentDidMount() {
        this.ref = firebase.database().ref('list');
        this.ref.on('value', this.handleToDoUpdate);
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
        console.log(this.list);
        this.setState({
            list: this.listView.cloneWithRows(this.list),
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
            <View>
            <ListView
            dataSource={this.state.list}
            renderRow={this._rowRender}
            />
            </View>
        );
    }
}