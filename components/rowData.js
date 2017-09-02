import React from 'react';
import { ListView, Text,  View, StyleSheet, Image } from 'react-native';

export default class RowData extends React.Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={{uri:this.props.pic}} resizeMode='cover'/>
                <View style={styles.rightSide}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <Text>จาก: {this.props.from}</Text>
                    { this.props.description && 
                        <Text style={styles.description}>คำอธิบาย: {this.props.description}</Text> 
                    }
                    { this.props.rating && 
                        <Text>rating: {this.props.rating}</Text>
                    }
                </View>
                <View style={styles.topSide}>
                    <Text>{this.props.date}</Text>
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
        // borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
    },
    rightSide:{
        marginLeft:15,
        justifyContent: 'center',
        // borderWidth:2,borderColor:'purple'
    },
    topSide:{
        alignSelf: 'flex-start',
        right: 0,
        padding: 10,
        position: 'absolute',
        flexDirection: 'row',
        // borderWidth:2,borderColor:'purple'
    },
    name:{
        fontWeight: 'bold',
        fontSize: 20
    },
    description:{
        fontStyle: 'italic',
        fontSize: 14
    }
})