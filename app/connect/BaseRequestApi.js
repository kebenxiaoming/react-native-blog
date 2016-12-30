import React, { Component} from 'react';
import {Alert} from 'react-native';

const baseURL = "http://kebenxiaoming.info";

function fetchAction(...props) {
  this.url = props.shift(1);
  this.options = props.shift(1);
  return fetch(this.url, Object.assign({}, this.options))
  .then((response) =>response.json());
}
export default {
  getBlogs(page) {
    var apiPort = "index.php?g=api&c=Blog&a=index&p="+page;
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  getBlogDetail(blogId){
    var apiPort = "index.php?g=api&c=Blog&a=detail";
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:'id='+blogId,
    });
  }
};