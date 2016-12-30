import React, { Component} from 'react';
import { View, ScrollView,StyleSheet,Text,Image,Navigator,Alert} from 'react-native';

import List from './List';

import MyStorage from '../storage/Local';

//获取屏幕的宽高
var Dimensions = require('Dimensions'); 
var swidth = Dimensions.get("window").width;
var sheight = Dimensions.get("window").height;

export default class Login extends Component {
	constructor(props) {
    super(props);
  }
     //点击跳转详情navigator
  _pressDetailButton() {
        const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'List',
                component: List,
            })
        }
    }

  render() {

    return (
      <Image style={styles.backgroundImage} source={require('../assets/images/main.jpg')} resizeMode={'cover'}>
      <ScrollView>
          <Text onPress={this._pressDetailButton.bind(this)} style={{fontSize:96}}>Scroll me plz</Text>
          <View onPress={this._pressDetailButton.bind(this)} style={{flex:3,flexDirection:'row',width:swidth}}><Image onPress={this._pressDetailButton.bind(this)} style={{width:0.5*swidth}} source={require('../assets/images/scroll1.jpg')} /><Text style={{width:0.5*swidth}}>测试一下</Text></View>
          <View onPress={this._pressDetailButton.bind(this)} style={{flex:3,flexDirection:'row',width:swidth}}><Image onPress={this._pressDetailButton.bind(this)} style={{width:0.5*swidth}} source={require('../assets/images/scroll1.jpg')} /><Text style={{width:0.5*swidth}}>测试一下</Text></View>
          <Text style={{fontSize:96}}>If you like</Text>
          <Image source={require('../assets/images/scroll2.jpg')} />
          <Image source={require('../assets/images/scroll2.jpg')} />
          <Image source={require('../assets/images/scroll2.jpg')} />
          <Image source={require('../assets/images/scroll2.jpg')} />
          <Image source={require('../assets/images/scroll2.jpg')} />
          <Image source={require('../assets/images/scroll2.jpg')} />
          <Image source={require('../assets/images/scroll2.jpg')} />
          <Text style={{fontSize:96}}>Scrolling down</Text>
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Text style={{fontSize:96}}>What's the best</Text>
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Image source={require('../assets/images/scroll3.jpg')} />
          <Text style={{fontSize:96}}>Framework around?</Text>
          <Image source={require('../assets/images/scroll2.jpg')} />
          <Image source={require('../assets/images/scroll2.jpg')} />
          <Image source={require('../assets/images/scroll2.jpg')} />
          <Image source={require('../assets/images/scroll2.jpg')} />
          <Text style={{fontSize:80}}>React Native</Text>
        </ScrollView>
      </Image>  
    )
  }
}



const styles = StyleSheet.create({

  backgroundImage:{
    width:swidth,
    height:sheight
  },
});