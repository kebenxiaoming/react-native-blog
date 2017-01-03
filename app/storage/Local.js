import React, { Component} from 'react';
import {AsyncStorage} from 'react-native';

export default {
    saveData(key,value){
        try {
            AsyncStorage.setItem(
                key,
                value,
                (error)=>{
                    if (error){
                        alert('存值失败:',error);
                    }
                    if(key=="userinfo"){
                        global.userinfo=value;
                    }
                }
            );
        } catch (error){
            alert('失败'+error);
        }
    },
    getValue(key){
        try {
            AsyncStorage.getItem(
                key,
                (error,result)=>{
                    if (error){
                        alert('取值失败:'+error);
                    }
                    if(key=="userinfo"){
                        global.userinfo=result;
                    }
                    alert(global.userinfo);
                }
            )
        }catch(error){
            alert('失败'+error);
        }
    },
    //自动登录之用
    autoLogin(){
      this.getValue("userinfo");
    },
    removeData(key){
        try {
            AsyncStorage.removeItem(
                key,
                (error)=>{
                    if(!error){
                        alert('移除成功');
                    }
                }
            )
        }catch (error){
            alert('失败',+error);
        }
    },
};