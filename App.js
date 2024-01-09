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
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      mail: '',
      selectedId: false,
      refreshing: false,
      data: [],
      page: 1,           // Trang hiện tại
      pageSize: 10,       // Số lượng mục trên mỗi trang
      loadingMore: false, // Trạng thái đang load thêm
    }
    this.appref = React.createRef()
  }

  handleButtonPress = () => {
    // Sử dụng ref để truy cập giá trị của TextInput
    console.log(this.appref.props.backgroundColor);
    debugger
  };

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

    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
      const color = item.id === selectedId ? 'white' : 'black';
      const isActive = item.id === selectedId ? true : false

      return (
        <Item
          ref={(ref) => this.appref = ref}
          item={item}
          onPress={() => {
            this.setState({ selectedId: item.id })
          }}
          backgroundColor={backgroundColor}
          color={color}
          selectedId={selectedId}
          isActive={isActive}
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
              placeholder="Nhập giá trị"
              ref={(ref) => {
                this.myInputRef = ref;
              }}
              onChangeText={(text) => {
                this.setState({
                  mail: text
                })
              }}
              value={mail} />
            <Button title="Lấy giá trị" style={styles.buttonRef} onPress={this.handleButtonPress} />
          </View>
          <View style={styles.icon}>
            <AntDesign name='windows' style={{ fontSize: 30, color: 'red' }} />
            <AntDesign name='facebook-square' style={{ fontSize: 30, color: 'red' }} />
            <AntDesign name='google' style={{ fontSize: 30, color: 'red' }} />
            <AntDesign name='twitter' style={{ fontSize: 30, color: 'red' }} />
            <Entypo name='instagram-with-circle' style={{ fontSize: 30, color: 'red' }} />
          </View>
          <View style={{ flex: 1 }}>
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
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  bodyApp: {
    flex: 1,
    padding: 10,
  },
  userBoard: {
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 15,
    flexDirection: 'column',
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 50,
    marginTop: 15
  },
  infoInput: {
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2,
    padding: 10
  },
  buttonRef: {
    color: 'red'
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
