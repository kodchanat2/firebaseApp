import React from 'react';
import { Text,  View, StyleSheet, TouchableHighlight } from 'react-native';
import firebase from './firebase';
import t from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
    name: t.String,              // a required string
    surname: t.maybe(t.String),  // an optional string
    age: t.Number,               // a required number
    rememberMe: t.Boolean        // a boolean
});

var options = {}; // optional rendering options (see documentation)

export default class AddPage extends React.Component {
        
    onPress = () => {
        // call getValue() to get the values of the form
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person
            Actions.home();
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref="form"
                    type={Person}
                    options={options}
                />
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});