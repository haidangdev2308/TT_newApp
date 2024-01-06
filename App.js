import React, { Component } from 'react';
import { Header, Greeting } from './components'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  KeyboardAvoidingView, TouchableOpacity,
  Modal
} from 'react-native';

class App extends Component {
  state = {
    userName: ''
  }

  usernameInput = (text) => {
    this.setState((prevState) => {
      return prevState.userName = text
    });
    // this.setState({ userName: text });
  }

  render() {
    return (
      <KeyboardAvoidingView >
        <Header userName={this.state.userName} />
          <ScrollView style={styles.bodyApp}>
            <Greeting />
            <View style={styles.userBoard}>
              <TextInput style={styles.infoInput}
                placeholder="Nhập tên của bạn"
                onChangeText={this.usernameInput}
                value={this.state.userName}
              />
              <TextInput style={styles.infoInput} />
            </View>
            <TouchableOpacity style={styles.buttonSubmit}>
              <Text>
                Gửi
              </Text>
            </TouchableOpacity>
          </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  bodyApp: {
    padding: 10,
  },
  userBoard: {
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 15,
    flexDirection: 'column',
  },
  infoInput: {
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2,
    padding: 10
  },
  buttonSubmit: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginTop: 200
  }
})



export default App;
