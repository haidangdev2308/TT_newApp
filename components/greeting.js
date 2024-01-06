import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'

class Greeting  extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        const date = new Date()
        const hour = date.getHours()

        let timeOfDate = ''

        if(hour < 11) {
            timeOfDate = 'sáng'
        } else if (hour >= 11 && hour < 17) {
            timeOfDate = 'trưa'
        } else {
            timeOfDate = 'tối'
        }
        return ( 
            <View>
                <Text style={styles.greetingText}>Xin chào buổi {timeOfDate}</Text>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    greetingText: {
        fontSize: 20,
    }
})
 
export default Greeting;