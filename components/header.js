import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'

class Header extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        count: 3
    }
    render() { 
        return ( 
            <View>
                <Text style={styles.headerStyle}>
                    Chào bạn {this.props.userName}
                </Text>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#000',
        color: 'white',
        padding: 15,
        fontWeight: "bold"
    }
})
 
export default Header;

