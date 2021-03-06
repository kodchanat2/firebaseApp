import React from 'react';
import { ListView, Text,  View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import ActionSheet from 'react-native-actionsheet';
import Rating from 'react-native-easy-rating'

export default class RowData extends React.Component {
    constructor(){
        super();
        this.state = {
            selected: ''
        }
        this.handlePress = this.handlePress.bind(this)
        this.showActionSheet = this.showActionSheet.bind(this)
    }

    showActionSheet() {
        this.ActionSheet.show()
    }

    handlePress(i) {
        this.setState({
            selected: i
        })
    }

    render() {
        return (
            <TouchableOpacity onLongPress={this.showActionSheet}>
                

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
                        {/* { this.props.rating && 
                            <Text>rating: {this.props.rating}</Text>
                        } */}
                        { this.props.rating && 
                            <Rating
                                rating={this.props.rating}
                                max={5}
                                iconWidth={24}
                                iconHeight={24}
                                iconSelected={require('../assets/star.png')}
                                iconUnselected={require('../assets/nostar.png')}
                            />
                        }
                    </View>
                    <View style={styles.topSide}>
                        <Text>{moment(this.props.date).calendar()}</Text>
                    </View>
                    
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={['Cancel','Edit','Delete']}
                        cancelButtonIndex={0}
                        destructiveButtonIndex={2}
                        onPress={this.handlePress}
                    />
                </View>
            </TouchableOpacity>
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