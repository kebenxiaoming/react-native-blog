import React, { Component} from 'react';
import { View, StyleSheet,ActivityIndicator,Modal,Button,TouchableHighlight,Text,Image, Alert,TextInput,Navigator,AsyncStorage } from 'react-native';

import Register from './Register';
import Forget from './Forget';
import Main from './Main';

import MyStorage from '../storage/Local';

import BaseRequestApi from '../connect/BaseRequestApi';

global.userinfo="";

export default class Login extends Component {
	constructor(props) {
    super(props);
    this.state = {username:"",password:"",modalVisible: false};
  }

  componentDidMount(){
    //MyStorage.autoLogin();
  }
  //修改modal显示状态
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
        //点击确认后请求
        if(this.state.username==""||this.state.password==""){
          alert("请输入后再提交!");return;
        }
        this.setModalVisible(true);
        this._goLogin(this.state.username,this.state.password);
    }

    //登陆成功之后跳转
    _redirectMain(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'Main',
                component: Main,
            })
        }
    }
    //保存用户信息
    _saveLocal(username,password,token){
        var userinfo={username:username,password:password,token:token};
        MyStorage.saveData("userinfo",JSON.stringify(userinfo));
    }

    _goLogin(username,password){
    try {
        BaseRequestApi.goLogin(username,password)
        .then((response) => {
           let status=response.status;
           let data = response.data;
           let msg=response.msg;
           if(status==1){
            this._saveLocal(username,password,data.token);
            this.setModalVisible(!this.state.modalVisible);
            this._redirectMain();
            }else{
              Alert.alert(
              '提示信息',
              msg,
              );
          }
        })
      } catch(e) {
        Alert.alert(
            '提示信息',
            JSON.stringify(e),
          );
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
      <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <View style={styles.centering}>
          <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
          <View>
          <Text style={{fontSize:15,color:'white'}}>正在登陆,请稍后...</Text>
          <ActivityIndicator
          animating={true}
          style={styles.indicatorStyle}
          color='white'
          size="large"
           />
          </View>
           </TouchableHighlight>
         </View>
      </Modal>
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
  centering: {
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"rgba(0,0,0,0.6)"
  },
  indicatorStyle:{
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
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