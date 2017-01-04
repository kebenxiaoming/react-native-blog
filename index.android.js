import React, { Component } from 'react';
import { AppRegistry,Navigator} from 'react-native';


import Main from './app/view/Main';

class LoginScreen extends Component {
	
 	render() {
            let defaultName = 'Main';
            let defaultComponent = Main;
            return (
            <Navigator
              initialRoute={{ name: defaultName, component: defaultComponent }}
              configureScene={(route) => {
              	if(route.name=='Login'){
                return Navigator.SceneConfigs.FloatFromLeft;
            	}else{
            		return Navigator.SceneConfigs.FloatFromRight;
            	}
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }} />
            );
     }
};
AppRegistry.registerComponent('AwesomeProject', () => LoginScreen);
