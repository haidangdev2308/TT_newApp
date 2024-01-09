import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

class Item extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) { 
        if((nextProps.isActive !== this.props.isActive) ){
            return true
        }
        else {
            return false; 
        }
    } 

    test = () => {
        console.log("hai dang");
    }
    
    render() {

        const { item, backgroundColor, onPress, color, isActive } = this.props
        console.log(`render ra item ${item.id}`)
        return (
            <TouchableOpacity onPress={onPress} style={[styles.itemBox, { backgroundColor }]}>
                <Text style={[styles.itemTitle, { color }]}>{item.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    itemBox: {
        padding: 15,
        backgroundColor: 'blue',
        borderRadius: 5,
        marginVertical: 10
    },
    itemTitle: {
        fontSize: 22,
    }
})
 
export default Item;
