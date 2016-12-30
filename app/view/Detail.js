import React, { Component} from 'react';
import { View, StyleSheet,WebView,Text,Image, Alert,Navigator } from 'react-native';

import BaseRequestApi from '../connect/BaseRequestApi';

export default class Detail extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      blogId:this.props.blogId,
      title:"",
      desc:"",
      detail:""
    };
  }

  //点击返回上级navigator
    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    componentDidMount(){
        //获取详情
        this.getBlogRequest(this.state.blogId);
    }


    getBlogRequest(blogId){
    if(this.state.isLoading){
      return;
    }
    try {
        BaseRequestApi.getBlogDetail(blogId)
        .then((response) => {
           let status=response.status;
           let data = response.data;
           let msg=response.msg;
           if(status==1){
           this.setState({
             title: data.title,
             desc:data.description,
             detail:data.content,
             isLoading:true
            });
            }else{
              Alert.alert(
              '提示信息',
              msg,
              );
              this.setState({
              isLoading:false
            });
          }
        })
      } catch(e) {
        Alert.alert(
            '提示信息',
            JSON.stringify(e),
          );
        this.setState({
         isLoading:false
        });
      }
  }
  //显示加载
  renderLoadingView()
  {
         return (<View style={styles.container} >
                 <Text>Loading blogs detail......</Text>
             </View>
         );
  }
  render() {

    if (!this.state.isLoading) {
             return this.renderLoadingView();
    }

    return (
          <View style={{flex:1,flexDirection:'column'}}>
          <View style={styles.topView}><Text style={{textAlign:'center'}}>{this.state.title}</Text></View>
          <View style={styles.descView}><Text style={{textAlign:'center'}}>{this.state.desc}</Text></View>
          <View style={styles.detailView} ><WebView style={styles.webviewCss} source={{html:this.state.detail}} scalesPageToFit={true} /></View>
          </View>
    )
  }
}

//获取屏幕的宽高
var Dimensions = require('Dimensions'); 
var swidth = Dimensions.get("window").width;
var sheight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  topView: {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  descView: {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  detailView: {
    flex:9,
  },
  webviewCss:{
    width:swidth,
  },
});