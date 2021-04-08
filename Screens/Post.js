import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import AppHeader from '../components/AppHeader'

import db from '../config'
import firebase from 'firebase'

export default class Post extends React.Component{
  constructor(){
    super();
    this.state={
      userid:firebase.auth().currentUser.email,
      subject:'',
      grade:'',
      board:'',
      postid:'',
      description:'',
      image:'#',
      uniqueID:''


    }
  }



  createUniqueId=()=>{
    return(
      Math.random().toString(36).substring(7)
    )
  }

  



    addPost=()=>{
      console.log('in add Post')
    var randomrequestID = this.createUniqueId()
    this.setState({
      uniqueID:randomrequestID
    })
    db.collection('All_Posts').add({
      'UserID':this.state.userid,
      'Description':this.state.description,
      'Post-ID':randomrequestID,
      'Description':this.state.description,
      'Subject':this.state.subject,
      'Grade':this.state.grade,
      'Board':this.state.board

    })
    this.setState({
        subject:'',
        grade:'',
        board:'',
        description:''

    })
    Alert.alert("Your notes are posted!")
    console.log("Your notes are posted!")
  }

  render(){
    return(
      <View>
        <View>

          <AppHeader title="Post your notes" navigation={this.props.navigation} />


        </View>
      <KeyboardAvoidingView style={styles.container}>

      <TextInput style={styles.inputstyle} placeholder="Subject of Notes (Eg. Maths , Chemistry etc.)" 
      onChangeText={(text)=>{this.setState({subject:text})}} 
      value={this.state.subject}></TextInput>

<TextInput style={styles.inputstyle} placeholder="Which grade do they suit? (Eg. 7 , 8 etc .... ONLY NUMBER)" 
      onChangeText={(text)=>{this.setState({grade:text})}} 
      value={this.state.grade}></TextInput>

<TextInput style={styles.inputstyle} placeholder="Which board of education do these notes suit? (Eg. CBSE , ICSE , IGCSE etc.)" 
      onChangeText={(text)=>{this.setState({board:text})}} 
      value={this.state.board}></TextInput>

<TextInput style={styles.inputstyle} placeholder="Any additional info you want to add? (Eg. Name of notes/post)" 
      onChangeText={(text)=>{this.setState({description:text})}} 
      value={this.state.description}></TextInput>

  



      <TouchableOpacity style={styles.submitbutton} onPress={()=>{this.addPost(),this.props.navigation.navigate('UploadPic',{details:this.state.uniqueID})}}><Text style={styles.textstyle}>Post</Text></TouchableOpacity>

      </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'white',
    margin: 10,
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