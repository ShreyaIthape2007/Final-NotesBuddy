import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import db from "../config";


export default class SideBarMenu extends React.Component{
  constructor(){
    super();
    this.state={
      name:'',
      image:'#',
      docID:'',
      userid:firebase.auth().currentUser.email
    }
  }

  componentDidMount=()=>{
    this.fetchimage(this.state.userid)
  }

  selectPicture=async()=>{
    console.log("Select Pic Called")
    const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowEditing:true,
      aspect:[4,3],
      quality:1

    })

    if (!cancelled){
      this.setState({image:uri})
      this.uploadImage(uri,this.state.userid)
    }

  }

  uploadImage=async(uri,imagename)=>{
    console.log("Upload Pic called")
    var response = await fetch(uri)
    var blob = await response.blob()
    var ref  = firebase.storage().ref().child("UserProfile/"+imagename);
    return ref.put(blob).then(response=>{
      this.fetchimage(imagename)
    })
}

fetchimage=async(imagename)=>{
  var storageref  = firebase.storage().ref().child("UserProfile/"+imagename);
  storageref.getDownloadURL().then(url=>{
    this.setState({image:url})
  }).catch(error=>{
    this.setState({image:'#'})
  })
  db.collection('USERS').where('Email','==',this.state.userid).then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({name:doc.data().First_Name+" "+doc.data().Last_Name,
                     image: doc.data().image,
                     docid: doc.id})
    })
  })
}


  render(){
    return(
      <View style={styles.container}>

      <Avatar
  rounded
  source={{
    uri:
      this.state.image,
  }}
  size="large"
   onPress={() => this.selectPicture()}
            containerStyle={styles.imageContainer}
  showEditButton
/>

<Text style={styles.textstyle}>{this.state.name}</Text>

      <View style={{flex:0.8,color:'black'}}>

      <DrawerItems  style={{color:'black',backgroundColor:'white'}} {...this.props}/>

      </View>

      <View style={{flex:0.2,justifyContent:'flex-end',paddingBottom:10}}>

        <TouchableOpacity onPress={()=>{
          firebase.auth().signOut()
          this.props.navigation.navigate('Welcome')
        }}><Text>Logout</Text></TouchableOpacity>

      </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    color:'black'
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
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 100,
  },
  imageContainer: {
    flex: 0.75,
    width: "40%",
    height: "10%",
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,
  },
});