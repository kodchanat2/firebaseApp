import React from 'react';
import { Text,  View, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import firebase from './firebase';
import t from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import UploadImage from './uploadImage';

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
    name: t.String,
    from: t.String,
    date: t.Date,
    description: t.maybe(t.String),
    rating: t.maybe(t.enums({ 1: '1 star', 2: '2 stars', 3: '3 stars', 4: '4 stars', 5: '5 stars' }))
});

var options = {
    
    fields:{
        name: {
            label: 'What is it?',
            auto: "placeholders",
        },
        from: {
            label: 'Where do you buy?',
            auto: "placeholders",
        },
        date:{
            label: 'When:',
            config: {
                format: (date) => {
                  const formatedDate = moment(date).calendar();
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
    constructor(){
        super();
        this.state = {
            image: null
        }
    }
        
    onPress = () => {

        var value = this.refs.form.getValue();
        if (value) { 
            console.log(value); 
                    
            var ref = firebase.database().ref('list').push();

            ref.set(value).then(()=>{
                if(!this.state.image){
                    Actions.pop();
                    return;
                }
                __uploadImage(ref.key, this.state.image.uri)
                .then(()=>{
                    Actions.pop();
                });
            })
        }
            
        __uploadImage = (key, path) => {
            return firebase.storage()
            .ref(`/pic/${key}`)
            .putFile( path, {contentType: 'image/jpeg'})
            .then(uploadedFile => {
                //success
                console.log('success',uploadedFile.downloadUrl);
                return __matchImageURL(key, uploadedFile.downloadUrl);
            })
            .catch(err => {
                //Error
                console.log(err);
            });
        }
        __matchImageURL = (key, url) => {
            return firebase.database()
                    .ref(`list/${key}`)
                    .update({pic: url})
        }
    }


    onSelectImage = (res) => {
        this.setState({image : res});
    }
    
    render() {
        return (
            <View  style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <UploadImage onSelectImage={this.onSelectImage}/>
                    <Form ref="form" type={Person} options={options} />
                </ScrollView>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Upload</Text>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ffffff',
    },
    scroll:{
        padding: 20,
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
        height: 46,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        margin: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});