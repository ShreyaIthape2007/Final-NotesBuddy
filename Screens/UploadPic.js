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
  Platform
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from 'firebase'
import db from '../config'
import AppHeader from '../components/AppHeader'




export default class UploadPic extends React.Component{
    constructor(props){
        super(props);
        this.state={
            image:'#',
            userid:firebase.auth().currentUser.email,
            uniqueID:this.props.navigation.getParam('details')
        }
    }

    componentDidMount=()=>{
      this.fetchimage(this.state.userid)
      this.uploadImage(this.state.image,this.state.userid)
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
        var Notes = "Notes"+this.state.uniqueID
        var response = await fetch(uri)
        var blob = await response.blob()
        var ref  = firebase.storage().ref().child("UserProfile/" + Notes +"/"+imagename);
        return ref.put(blob).then(response=>{
          this.fetchimage(imagename)
        })
    }
    
    fetchimage=async(imagename)=>{
      var storageref  = firebase.storage().ref().child("UserNotes/"+imagename);
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

            <View>

            <View>

              <AppHeader title="Upload or scan your notes" navigation={this.props.navigation} />


            </View>

            <TouchableOpacity> <Text>Scan your notes!</Text> </TouchableOpacity>

            <TouchableOpacity onPress={()=>{this.selectPicture()}}> <Text>Choose notes from gallery!</Text> </TouchableOpacity>

            </View>

        )
    }
    
}