import React, { Component} from 'react';
import { View, StyleSheet,Text,Image, Alert,TextInput,Navigator } from 'react-native';

import Register from './Register';
import Forget from './Forget';
import Main from './Main';

export default class Login extends Component {
	constructor(props) {
    super(props);
    this.state = {username: '',password:''};
  }

  //点击跳转navigator
  _pressRButton() {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'Register',
                component: Register,
            })
        }
    }

    //点击跳转navigator
  _pressOkButton() {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'Main',
                component: Main,
            })
        }
    }

    //点击跳转navigator
  _pressLButton() {
        const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'Forget',
                component: Forget,
            })
        }
    }

  render() {

    return (
      <Image style={styles.backgroundImage} source={require('../assets/images/login.jpg')} resizeMode={'contain'}>
      <View style={styles.mainView}>
      <View style={styles.formView}>
      <View style={styles.formTitleView}><Text style={styles.formTitleText}>登录</Text></View>
        <View style={styles.nameView}><TextInput
          style={{height: 50}}
          onChangeText={(username) => this.setState({username})}
        />
        </View>
        <View style={styles.passView}><TextInput
          style={{height: 50}}
          onChangeText={(password) => this.setState({password})}
          />
        </View>
        <View style={styles.submitView}>
        <Text style={styles.buttonStyle} onPress={this._pressOkButton.bind(this)}>确认</Text></View>
      </View> 
      <View style={styles.bottomView}>
      <Text style={{textAlign:'left',
    width:0.3*swidth}} onPress={this._pressLButton.bind(this)} >
      忘记密码
      </Text>
      <Text style={{textAlign:'right',
    width:0.3*swidth}} onPress={this._pressRButton.bind(this)}>
      注册
      </Text>
      </View>
      </View>
      </Image>  
    )
  }
}


//获取屏幕的宽高
var Dimensions = require('Dimensions'); 
var swidth = Dimensions.get("window").width;
var sheight = Dimensions.get("window").height;

const styles = StyleSheet.create({

  backgroundImage:{
    width:swidth,
    height:sheight
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formView:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height:0.8*sheight,
  },
  formTitleView: {
    width:200,
    height: 50, 
    backgroundColor: 'powderblue'
  },
  formTitleText: {
    padding: 10, 
    fontSize: 20,
    textAlign:'center'
  },
  nameView:{
    width:200,
    height: 50, 
    backgroundColor: 'skyblue'
  },
  passView:{
    width:200,
    height: 50, 
    backgroundColor: 'steelblue'
  },
  submitView:{
    width:200,
    height: 50, 
    backgroundColor: 'powderblue',
    flexDirection: 'row'
  },
  buttonStyle:{
    flex:2,
    padding: 10, 
    fontSize: 20,
    textAlign:'center'
  },
  bottomView:{
    flex:2,
    flexDirection: 'row',
    height:0.2*sheight,
    justifyContent: 'space-between',
    alignItems:'center',
  },
  bottonLeftText:{
    textAlign:'left',
    width:0.3*{swidth}
  },
  bottonRightText:{
    textAlign:'right',
    width:0.3*{swidth}
  },
});