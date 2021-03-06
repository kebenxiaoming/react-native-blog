import React, { Component} from 'react';
import { View, StyleSheet,Text,Image, Alert,TextInput,Navigator } from 'react-native';

import Login from './Login';

export default class Register extends Component {
	constructor(props) {
    super(props);
    this.state = {username: '',password:''};
  }

  //点击返回上级navigator
    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
            navigator.pop();
        }
    }

  render() {
    //获取屏幕的宽高
    var Dimensions = require('Dimensions'); 
    var swidth = Dimensions.get("window").width;
    var sheight = Dimensions.get("window").height;

    return (
      <Image style={{width:swidth,height:sheight}} source={require('../assets/images/login.jpg')} resizeMode={'contain'}>
      <View style={{flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',}}>
      <View style={{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height:0.8*sheight,
      }}>
      <View style={{width:200,height: 50, backgroundColor: 'powderblue'}}><Text style={{padding: 10, fontSize: 20,textAlign:'center'}}>注册</Text></View>
        <View style={{width:200,height: 50, backgroundColor: 'skyblue'}}><TextInput
          style={{height: 50}}
          onChangeText={(username) => this.setState({username})}
        />
        </View>
        <View style={{width:200,height: 50, backgroundColor: 'steelblue'}}><TextInput
          style={{height: 50}}
          onChangeText={(password) => this.setState({password})}
          />
        </View>
        <View style={{width:200,height: 50, backgroundColor: 'powderblue',flexDirection: 'row'}}>
        <Text style={{flex:2,padding: 10, fontSize: 20,textAlign:'center'}} onPress={() => Alert.alert(
            'Alert Title',
            '登录请求',
          )}>注册</Text></View>
      </View> 
      <View style={{
        flex:2,
        flexDirection: 'row',
        height:0.2*sheight,
        justifyContent: 'space-between',
        alignItems:'center',
      }}>
      <Text style={{
        textAlign:'center',
        width:swidth
      }} onPress={this._pressButton.bind(this)}>
      返回
      </Text>
      </View>
      </View>
      </Image>  
    )
  }
}