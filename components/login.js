import React from 'react';
import { Text,  View, StyleSheet, TouchableHighlight } from 'react-native';
import firebase from './firebase';
import t from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
    email: t.String,              // a required string
    password: t.refinement(t.String, function (n) {
        return n.length >= 6;
      }),               // a required number
    rememberMe: t.Boolean        // a boolean
});

var options = {
    fields:{
        email:{
            keyboardType: 'email-address'
            
        },
        password:{
            secureTextEntry:true,
            error: 'password must has 6 charectors or more'
        }
    }
}; // optional rendering options (see documentation)

export default class Login extends React.Component {

    constructor() {
        super();
        this.unsubscribe = null;
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // Actions.home();
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    onPress = () => {
        // call getValue() to get the values of the form
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person
            
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
            .then((user) => {
              console.log('User successfully logged in', user);
              Actions.home();
            })
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                {/* display */}
                <Form
                    ref="form"
                    type={Person}
                    value={{email:'kodchanat2@gmail.com',password:'123456', rememberMe:true}}
                    options={options}
                />
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Login</Text>
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