import React, { Component } from 'react';
import { Header, Greeting, Item } from './components'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  KeyboardAvoidingView, TouchableOpacity,
  RefreshControl,
  FlatList,
  Button
} from 'react-native';
import data from './data'

class App extends Component {
  state = {
    userName: '',
    mail: '',
    selectedId: false,
    refreshing: false,
    data: [],
    page: 1,           // Trang hiện tại
    pageSize: 10,       // Số lượng mục trên mỗi trang
    loadingMore: false, // Trạng thái đang load thêm
    value: 0
  }

  usernameInput = (text) => {
    this.setState((prevState) => {
      return prevState.userName = text
    });
    // this.setState({ userName: text });
  }


  getData = () => {
    this.setState({
      data: data
    })
  }

  loadData() {
    const { page, pageSize } = this.state;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    // Lấy chỉ mục từ startIndex đến endIndex (10 mục đầu tiên ban đầu)
    const initialData = data.slice(startIndex, endIndex);
    
    this.setState({
      data: initialData // Thêm dữ liệu mới vào danh sách hiện tại
    });
  }

  

  componentDidMount() {
    this.getData()
    this.loadData()
  }

  loadMoreData = () => {
    const { page, pageSize } = this.state;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    // Lấy chỉ mục từ startIndex đến endIndex (10 mục tiếp theo)
    const moreData = data.slice(startIndex, endIndex);

    this.setState((prevState) => ({
      data: [...prevState.data, ...moreData], // Thêm dữ liệu mới vào danh sách hiện tại
      page: prevState.page + 1, // Tăng số trang
      loadingMore: false, // Kết thúc quá trình load thêm
    }));
  };

  handleEndReached = () => {
    if (!this.state.loadingMore) {
      this.setState({ loadingMore: true });
      this.loadMoreData();
    }
  };

  renderFooter = () => {
    if (this.state.loadingMore) {
      return (
        <View>
          <Text>Loading more...</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  
  render() {

    const { mail, selectedId, data, refreshing } = this.state;
    // console.log('render');
    
    

    const renderItem = ({item}) => {
      const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
      const color = item.id === selectedId ? 'white' : 'black';
  
      return (
        <Item
          item={item}
          // onPress={() => this.setState({selectedId: item.id})}
          onPress={() => {
            this.setState({
                value: this.state.value + 1
            })
          }}
          backgroundColor={backgroundColor}
          color={color}
          selectedId={selectedId}
          value={this.state.value}
        />
      );
    };
    

    return (
      <View style={styles.container}>
        <Header userName={this.state.userName} />
        <View style={styles.bodyApp}>
          <Greeting />
          <View style={styles.userBoard}>
            <TextInput style={styles.infoInput}
              placeholder="Nhập tên của bạn"
              onChangeText={this.usernameInput}
              value={this.state.userName}
            />
            <TextInput style={styles.infoInput}
              placeholder="Nhập họ của bạn"
              onChangeText={(text) => {
                this.setState({
                  mail: text
                })
              }}
              value={mail} />
          </View>
          <View style={{ flex: 1}}>
            <FlatList
              data={data}
              refreshControl={ //pull refreshing set selectedId lại từ đầu
                <RefreshControl refreshing={refreshing} onRefresh={() => {
                  this.setState({ selectedId: false })
                  this.setState({ refreshing: false })
                }} />
              }
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
              onEndReached={this.handleEndReached}
              onEndReachedThreshold={0.01} // Khi cách cuối màn hình 10% thì gọi onEndReached
              ListFooterComponent={this.renderFooter}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{ 
    flex : 1
  },
  flatList: {
    flex: 1,
    height : 100,
    backgroundColor : 'red'
  },
  bodyApp: {
    flex : 1,
    padding: 10,
    // backgroundColor : 'red'
  },
  userBoard: {
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 15,
    flexDirection: 'column',
    marginBottom: 50
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
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
})



export default App;
