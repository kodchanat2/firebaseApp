import React from 'react';
import { Text,  View, StyleSheet, TouchableHighlight } from 'react-native';
import firebase from './firebase';
import t from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
    name: t.String,
    from: t.String,
    date: t.Date,
    description: t.maybe(t.String),
    rating: t.maybe(t.enums({
        1: '1 star',
        2: '2 stars',
        3: '3 stars',
        4: '4 stars',
        5: '5 stars',
    }))
});

var options = {
    
    fields:{
        name: {
            label: 'What is it?',
            auto: "placeholders",
            autoFocus: true
        },
        from: {
            label: 'Where do you buy?',
            auto: "placeholders",
        },
        date:{
            label: 'When:',
            config: {
                format: (date) => {
                  const formatedDate = moment(date).toNow();
                  return formatedDate;
                },
            },
            mode: 'time',
        },
        description: {
        },
        rating: {
        }
    }
}; 

export default class AddPage extends React.Component {
        
    onPress = () => {

        var value = this.refs.form.getValue();
        if (value) { 
            console.log(value); 
                    
            firebase.database()
            .ref('list')
            .push()
            .set({
                ...this.list, 
                ...value
            });
            Actions.pop();
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
        marginTop: 30,
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