import * as React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import UploadPic from '../Screens/UploadPic'
import Post from '../Screens/Post'
import NotesDetails from '../Screens/NotesDetails'


export const AppStackNavigator = createStackNavigator({
  Post:{screen:Post,
  navigationOptions:{
    headerShown:false
  }
},
  UploadPic:{screen:UploadPic},
  NotesDetails:{screen:NotesDetails},




},
{
  initialRouteName:'Post'
})