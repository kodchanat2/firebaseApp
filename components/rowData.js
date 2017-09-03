import React from 'react';
import { ListView, Text,  View, StyleSheet, Image } from 'react-native';
import moment from 'moment';

export default class RowData extends React.Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Image 
                    style={styles.img} 
                    source={this.props.pic ? {uri:this.props.pic} : require('../assets/upload.png')} 
                    resizeMode='cover'
                />
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
                    <Text>{moment(this.props.date).fromNow()}</Text>
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
        borderColor: '#eee',
        backgroundColor: "#ccc",
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