import * as React from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import {
  Button,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import firebase from 'firebase';


export default class MyHeader extends React.Component {
  constructor(props) {
    super(props);
  }




  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="black"
            onPress={() => {
            console.log('bar pressed')
            this.props.navigation.toggleDrawer()
            }}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: { color: 'black', fontSize: 20, fontWeight: 'bold' },
        }}
        rightComponent={
            <Icon
            name="sign-out"
            type="font-awesome"
            color="black"
            onPress={()=>{
                this.props.navigation.navigate('WelcomeScreen')
               // firebase.auth().signOut()
            }}
            
            />
        }
        backgroundColor="white"
      />
    );
  }
}