import React from 'react';
import { ListView, Text,  View } from 'react-native';

export default class RowData extends React.Component {
    
    render() {
        return (
            <View>
                <Text>{this.props.name}</Text>
            </View>
        );
    }
}