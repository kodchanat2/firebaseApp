import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

var options = {
    title: 'Select Avatar',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

export default class UploadImage extends React.Component {
    constructor(){
        super()
        this.state = {
            avatarSource: null
        };
    }
    onPress = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
          
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source
              });
            }
          });
    }
    
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.onPress}>
                    <Image source={this.state.avatarSource || require('../assets/null.jpg')} style={styles.img} />
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    img:{
        width:350,
        height:350,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: "#eee",
        marginBottom: 50
    }
});