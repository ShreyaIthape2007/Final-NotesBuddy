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
import { Avatar } from "react-native-elements";




export default class UploadPic extends React.Component{
    constructor(props){
        super(props);
        this.state={
            image:'#',
            userid:firebase.auth().currentUser.email,
            currentunique:'',
            numofpages:''
        

        }
    }

    componentDidMount=()=>{
      this.fetchimage(this.state.userid)
      this.uploadImage(this.state.image,this.state.userid)
    }

    createUniqueId=()=>{

      
      return(
        Math.random().toString(36).substring(7)
      )
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
        var uniqueid=this.createUniqueId()
        var ref  = firebase.storage().ref().child("UserProfile/Notes/"+imagename+"_"+this.createUniqueId());
        return ref.put(blob).then(response=>{
          this.fetchimage(imagename)
        })
    }
    
    fetchimage=async(imagename)=>{
      console.log('in fetchimage')

      var storageref  = firebase.storage().ref().child("UserProfile/Notes/"+imagename+"_"+this.createUniqueId());
      storageref.getDownloadURL().then(url=>{
        this.setState({image:url})
      }).catch(error=>{
        this.setState({image:'#'})
      })
      console.log('image ',this.state.image)
    }
    
    render(){
        return(

            <View>



            <View>

              <AppHeader title="Upload or scan your notes" navigation={this.props.navigation} />


            </View>



            <TouchableOpacity> <Text>Scan your notes!</Text> </TouchableOpacity>

            <TouchableOpacity onPress={()=>{this.selectPicture()}}> <Text>Choose notes from gallery!</Text> </TouchableOpacity>

            <TextInput 
            style={{width:200}} 
            onChangeText={(text)=>{this.setState({numofpages:text})}}
            placeholder="Enter number of pages to upload"
            value={this.state.numofpages}
            
            /> 

  

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