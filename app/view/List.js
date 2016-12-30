import React, { Component} from 'react';
import { View,TouchableHighlight,ListView,Alert,ActivityIndicator,StyleSheet,Text,Image,Navigator } from 'react-native';

import BaseRequestApi from '../connect/BaseRequestApi';
import Detail from './Detail';

var page=1;
var totalBlogs=new Array();
var first=true;

export default class List extends Component {

	constructor(props) {
    super(props);
    this.state ={
      isLoading:false,
      dataSource: new ListView.DataSource({
                 rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount(){
         this.getBlogRequest(page);
  }

   getBlogRequest(p){
    if(this.state.isLoading){
      return;
    }
    if(!first){
        page=page+1;
    }else{
        page=p;
    }
    try {
        BaseRequestApi.getBlogs(page)
        .then((response) => {
           let status=response.status;
           let data = response.data;
           let msg=response.msg;
           if(status==1){
            page=data.nowpage;
            for(let i=0;i<data.articles.length;i++){
                totalBlogs.push(data.articles[i]);
            }
           this.setState({
             dataSource: this.state.dataSource.cloneWithRows(totalBlogs),
             isLoading:true
            });
            if(first){
            first=false;
            }
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
  _loadmore(){
    if(first){
        return;
    }
    this.setState({
         isLoading:false
        });
    this.getBlogRequest(page);
    
  }
  //显示加载
   renderLoadingView()
     {
         return (<View style={styles.container} >
                 <Text>Loading blogs......</Text>
             </View>
         );
     }
     //跳转详情页
     _pressRow(blogId){
        const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'Detail',
                component: Detail,
                params:{  
                    blogId:blogId,  
                }  
            })
        }
     }
    //显示博客列表的内容
     renderBlog(blog) {
         return (
          <TouchableHighlight onPress={()=>{this._pressRow(blog.id)}}>
             <View style={styles.newcontainer}>
                 <Image
                     source={{uri: blog.realpath}}
                     style={styles.thumbnail}
                 />
                 <View style={styles.rightContainer}>
                     <Text style={styles.title}>{blog.title}</Text>
                     <Text style={styles.year}>浏览数:{blog.views}</Text>
                 </View>
             </View>
          </TouchableHighlight>
         );
     }

  render() {
    if (!this.state.isLoading&&first) {
             return this.renderLoadingView();
    }
    return (
          <View style={{flex:1,flexDirection:'column'}}>
          <View style={styles.topView}><Text style={{textAlign:'center'}}>博客列表</Text></View>
          <ListView
                 dataSource={this.state.dataSource}
                 renderRow={this.renderBlog.bind(this)}
                 style={styles.listView}
                 onEndReached={this._loadmore.bind(this)}
                 onEndReachedThreshold={0}
             />
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
  newcontainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
   rightContainer: {
         flex: 2,
  },
  title: {
         fontSize: 20,
         marginBottom: 5,
         textAlign: 'center',
  },
  year: {
         textAlign: 'center',
  },
   thumbnail: {
         width: 53,
         height: 81,
  },
  listView: {
         flex: 9,
         backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 13,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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