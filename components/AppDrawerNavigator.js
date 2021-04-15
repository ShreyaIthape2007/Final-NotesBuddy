import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './Apptabnavigator';
import SideBarMenu from './sidebarMenu';
import firebase from 'firebase';
import Profile from '../Screens/ProfileScreen';
import { Icon } from 'react-native-elements';
import Feed from '../Screens/Feed';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="home" type="font-awesome" />,
        drawerLabel: 'Home',
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        drawerIcon: <Icon name="user-circle" type="font-awesome" />,
        drawerLabel: 'Profile',
      },
    },

    Feed:{screen:Feed}

  },

  {
    contentComponent: SideBarMenu,
  },
  {
    initialRouteName: 'Home',
  }
);
