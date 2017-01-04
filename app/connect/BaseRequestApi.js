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
  },
  goLogin(username,password){
    var apiPort = "index.php?g=api&c=Login&a=index";
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:'username='+username+'&password='+password,
    });
  },
  autoLogin(username,password,token,nowObject){
    var apiPort = "index.php?g=api&c=Login&a=checkToken";
    nowObject.setModalVisible(false);
    nowObject.setLoginState(true);

    try {
        BaseRequestApi.goLogin(username,password)
        .then((response) => {
           let status=response.status;
           let data = response.data;
           let msg=response.msg;
           if(status==1){
            this._saveLocal(username,password,data.token);
            this.setModalVisible(!this.state.modalVisible);
            }else{
              this.setModalVisible(!this.state.modalVisible);
              Alert.alert(
              '提示信息',
              msg,
              );
          }
        })
      } catch(e) { 
        this.setModalVisible(!this.state.modalVisible);
        Alert.alert(
            '提示信息',
            JSON.stringify(e),
          );
      }
    // return fetchAction(`${baseURL}/${apiPort}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body:'username='+username+'&password='+password,
    // });
  }
};