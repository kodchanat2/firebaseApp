import React from 'react';
import { ListView, Text,  View, StyleSheet, Image } from 'react-native';

export default class RowData extends React.Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={{uri:this.props.pic}} resizeMode='cover'/>
                <View style={styles.rightSide}>
                    <Text style={styles.name}>name: {this.props.name}</Text>
                    <Text>status: {this.props.status}</Text>
                    <Text>line: {this.props.line}</Text>
                </View>
                <View style={styles.bottomSide}>
                    <Text>{this.props.sex}</Text>
                    <Text> {this.props.age}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        borderBottomWidth: 2,
        borderBottomColor: '#aaa',
        padding: 10,
        flexDirection: 'row',
        // borderWidth:2,borderColor:'purple'
    },
    img:{
        width: 100,
        height:100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
    },
    rightSide:{
        marginLeft:15,
        justifyContent: 'center',
        // borderWidth:2,borderColor:'purple'
    },
    bottomSide:{
        alignSelf: 'flex-end',
        right: 0,
        position: 'absolute',
        flexDirection: 'row',
        // borderWidth:2,borderColor:'purple'
    },
    name:{
        fontWeight: 'bold',
        fontSize: 20
    }
})