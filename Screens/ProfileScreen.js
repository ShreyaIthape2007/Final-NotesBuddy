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
  Alert
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase'
import db from '../config'
import AppHeader from '../components/AppHeader'

export default class Profile extends React.Component {
  constructor(){
    super();
    this.state={
      fName:'',
      lName:'',
      contact:'',
      emailid:'',
      documentid:''
    }
  }

  getUserDetails=async()=>{
    var currentuser=firebase.auth().currentUser;
    var email = currentuser.email;
    //console.log(email)
    await db.collection('USERS').where('Email','==',email).get().then(Snapshot=>{
      Snapshot.forEach(doc=>{
        var data=doc.data()
        //console.log(data)
        this.setState({
          fName:data.First_Name,
          lName:data.Last_Name,
          contact:data.Contact,
          emailid:data.Email,
          documentid:doc.id
        })
      })
    })

  }

  updateUserDetails=()=>{
    db.collection('USERS').doc(this.state.documentid).update({
      'First_Name':this.state.fName,
      'Last_Name':this.state.lName,
      'Contact':this.state.contact,

    })
    Alert.alert("User Information Updated!")

  }

  componentDidMount=()=>{
    this.getUserDetails()
  }
  render() {
    return (
      <SafeAreaProvider>

        <View>

        <AppHeader title="Edit your details" navigation={this.props.navigation} />


        </View>

        <View style={styles.container}>
          <TextInput
          style={styles.forminput}
          placeholder="First Name"
          maxLength={10}
          onChangeText={(text) => {
            this.setState({ fName: text });
          }}

          value={this.state.fName}
        />

        <TextInput
          style={styles.forminput}
          placeholder="Last Name"
          maxLength={10}
          onChangeText={(text) => {
            this.setState({ lName: text });
          }}
          value={this.state.lName}
        />

        <TextInput
          style={styles.forminput}
          placeholder="Address"
          multiline={true}
          onChangeText={(text) => {
            this.setState({ address: text });
          }}
          value={this.state.address}
        />

        <TextInput
          style={styles.forminput}
          placeholder="Contact"
          maxLength={10}
          keyboardType={'number-pad'}
          onChangeText={(text) => {
            this.setState({ contact: text });

          }}
          value={this.state.contact}
        />

        <TouchableOpacity style={styles.submitbutton} onPress={()=>{this.updateUserDetails()}}>
        <Text style={styles.textstyle}>
        Save
        </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCB77',
  },

  textstyle: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Futura',
    marginTop: 5,
  },

  inputstyle: {
    height: 50,
    width: 200,
    borderBottomWidth: 2,

  },
  submitbutton: {
    height: 30,
    width: 150,
    alignSelf: 'center',
    backgroundColor: '#FEF9EF',
    margin: 10,
    borderRadius: 15,
  },
   centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
  }},
      forminput:{
    height: 40,
    width: 200,
    borderWidth:2,
    borderRadius:10,
    marginTop:5,
    backgroundColor:'#FEF5EF'
   

    }

})
