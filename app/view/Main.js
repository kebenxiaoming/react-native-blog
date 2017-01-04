import React, { Component} from 'react';
import { View, ScrollView,StyleSheet,TouchableHighlight,Text,Image,Navigator,Alert} from 'react-native';

import List from './List';
import Login from './Login';
import About from './About';
import Contact from './Contact';

import MyStorage from '../storage/Local';

//获取屏幕的宽高
var Dimensions = require('Dimensions'); 
var swidth = Dimensions.get("window").width;
var sheight = Dimensions.get("window").height;

export default class Main extends Component {
	constructor(props) {
    super(props);
  }
     //点击跳转详情navigator
  _pressListButton() {
        const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'List',
                component: List,
            })
        }
    }

  _pressLoginButton(){
    if(global.userinfo!=""){
      isLogin=true;
    }else{
      isLogin=false;
    }
    const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'Login',
                component: Login,
                params:{  
                    login:isLogin,  
                }  
            })
        }
  }

  _AboutMe(){
    const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'About',
                component: About,
            })
        }
  }

  _ContactMe(){
    const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'Contact',
                component: Contact,
            })
        }
  }

  render() {

    return (
      <Image style={styles.backgroundImage} source={require('../assets/images/main.jpg')} resizeMode={'cover'}>
      <ScrollView>
          <Text style={{fontSize:33,textAlign:'center',color:'white'}}>Know Nothing May Be Better Than Know A Little</Text>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:swidth,height:0.3*sheight}}>
          <TouchableHighlight onPress={this._pressListButton.bind(this)} >
          <Image style={{width:0.3*swidth,height:0.2*sheight}} source={require('../assets/images/scroll1.jpg')} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this._pressLoginButton.bind(this)} >
          <Image style={{width:0.3*swidth,height:0.2*sheight}} source={require('../assets/images/scroll2.jpg')} />
          </TouchableHighlight>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:swidth,height:0.3*sheight}}>
           <TouchableHighlight onPress={this._ContactMe.bind(this)} >
          <Image style={{width:0.3*swidth,height:0.2*sheight}} source={require('../assets/images/scroll3.jpg')} />
           </TouchableHighlight>
           <TouchableHighlight onPress={this._AboutMe.bind(this)} >
          <Image style={{width:0.3*swidth,height:0.2*sheight}} source={require('../assets/images/scroll4.jpg')} />
           </TouchableHighlight>
           </View>
        </ScrollView>
      </Image>  
    )
  }
}



const styles = StyleSheet.create({

  backgroundImage:{
    width:swidth,
    height:sheight,
  },
});