

import * as React from 'react';
import {
  Button,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';
import { Card } from 'react-native-elements';
import AppHeader from '../components/AppHeader'
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";


export default class NotesDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postid: this.props.navigation.getParam('details')['Post-ID'],
      subject: this.props.navigation.getParam('details')['Subject'],
      description: this.props.navigation.getParam('details')['Description'],
      grade: this.props.navigation.getParam('details')['Grade'],
      board: this.props.navigation.getParam('details')['Board'],
      contact:'',
      getimageurl:''

    };
  }

  //getContact=()=>{
  //  db.collection('USERS').
  //}

  getImage=async()=>{
    const ref = firebase.storage().ref('UserProfile/Notes/buddy2@gmail.com_mbcr2g');
    const url = await ref.getDownloadURL();
    this.setState({
      getimageurl:url
    })

  }



  render() {
    return (
      <SafeAreaProvider>
      <View>

        <AppHeader title="Notes Details" navigation={this.props.navigation} />


      </View>
        <View style={{flex:1}}>
          <View style={{ flex: 0.4 }}>
            <Card title={'Notes Details'} titleStyle={{ fontSize: 20 }}>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Subject : {this.state.subject}
                </Text>
              </Card>

              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Grade : {this.state.grade}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Education Board : {this.state.board}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Description : {this.state.description}
                </Text>
              </Card>
             

           
              
            </Card>
          
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F19C79',
  },

  textstyle: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Futura',
    marginTop: 5,
  },

  inputstyle: {
    height: 50,
    width: 300,
    margin: 10,
    borderBottomWidth: 2,
  },
  inputView: {
    flexDirection: 'row',
    margin: 20,
  },
  submitbutton: {
    height: 30,
    width: 150,
    alignSelf: 'center',
    backgroundColor: '#FEF9EF',
    borderRadius: 15,
    
  },
    buttonstyle: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    backgroundColor: '#A44A3F',
    margin: 10,
    borderRadius: 100,
  },
});