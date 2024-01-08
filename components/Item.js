import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

class Item extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) { 
        console.log(11111111111);
        if (nextProps.selectedId !== this.props.selectedId) { 
          return true; 
        } else { 
          return false; 
        } 
    } 

    
    
    render() {
        const { item, backgroundColor, onPress, color } = this.props
        console.log(`render ra item ${item.id}`)
        return (
            <TouchableOpacity onPress={onPress} style={[styles.itemBox, { backgroundColor }]}>
                <Text style={[styles.itemTitle, { color }]}>{item.title}</Text>
                <Button>add</Button>
                <Text></Text>
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
