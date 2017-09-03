import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

var options = {
    title: 'Select Picture',
    storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'photo'
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
            else {
                let source = { uri: response.uri };                
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
                    <Image source={this.state.avatarSource || require('../assets/upload.png')} style={styles.img}>
                        <Image source={require('../assets/upload.png')} style={styles.overlay} />
                    </Image>
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
        marginBottom: 50,
        backgroundColor: "#eee"
    },
    overlay:{
        flex:1,
        opacity: 0.2,
        width:350,
        alignSelf: 'center',
        height:350,

    }
});