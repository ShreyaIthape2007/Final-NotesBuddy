import React from 'react'
import {Image} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Post from '../Screens/Post.js';
import Feed from '../Screens/Feed.js';
import {AppStackNavigator} from './AppStackNavigator'


export const AppTabNavigator=createBottomTabNavigator({
  Post:{screen:AppStackNavigator,
  navigationOptions:{
    tabBarIcon:<Image></Image>,
    tabBarLabel:"Post Notes" 
  }},

  Feed:{screen:Feed,
  navigationOptions:{
    tabBarIcon:<Image></Image>,
    tabBarLabel:"View posts"
  }},

})