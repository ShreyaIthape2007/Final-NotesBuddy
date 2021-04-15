import * as React from 'react';
import { Text, View, StyleSheet ,TouchableOpacity} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import WelcomeScreen from './Screens/WelcomeScreen'
import {AppTabNavigator} from './components/Apptabnavigator';
import { AppStackNavigator } from './components/AppStackNavigator';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';




//email:buddy1@gmail.com
//password:buddy123

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }

}

const SwitchNavigator=createSwitchNavigator({
 Welcome:{screen:WelcomeScreen},
 Drawer: { screen: AppDrawerNavigator },
  BottomTab:{screen:AppTabNavigator}
})

const AppContainer=createAppContainer(SwitchNavigator)
