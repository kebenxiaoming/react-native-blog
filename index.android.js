import React, { Component } from 'react';
import { AppRegistry,Navigator} from 'react-native';


import Login from './app/view/Login';

class LoginScreen extends Component {
	
 	render() {
            let defaultName = 'Login';
            let defaultComponent = Login;
            return (
            <Navigator
              initialRoute={{ name: defaultName, component: defaultComponent }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.HorizontalSwipeJump;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }} />
            );
     }
};
AppRegistry.registerComponent('AwesomeProject', () => LoginScreen);
