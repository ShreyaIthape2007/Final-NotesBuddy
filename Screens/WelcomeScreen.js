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
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailid: '',
      password: '',
      modalVisible:false,
      firstName:'',
      lastName:'',
      contact:'',
      confirmPassword:'',
      username:''
    };
  }

  showmodal=()=>{
    return(
        
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.textstyle,{fontSize:20}]}>Registration</Text>

              <TextInput style={styles.forminput}
              placeholder="First Name"
              maxLength={10}
              onChangeText={(text)=>{this.setState({firstName:text})}}/>

              <TextInput style={styles.forminput}
              placeholder="Last Name"
              maxLength={10}
              onChangeText={(text)=>{this.setState({lastName:text})}}/>


              <TextInput style={styles.forminput}
              placeholder="Contact"
              maxLength={10}
              keyboardType={"number-pad"}
              onChangeText={(text)=>{this.setState({contact:text})}}/>

              <TextInput style={styles.forminput}
              placeholder="Email"
              keyboardType={"email-address"}
              onChangeText={(text)=>{this.setState({emailid:text})}}/>

              <TextInput style={styles.forminput}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text)=>{this.setState({password:text})}}/>

              <TextInput style={styles.forminput}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(text)=>{this.setState({confirmPassword:text})}}/>

            <TextInput style={styles.forminput}
              placeholder="Username"
              onChangeText={(text)=>{this.setState({username:text})}}/>

              <View>

              <TouchableOpacity style={styles.submitbutton} onPress={()=>{this.signup(this.state.emailid,this.state.password,this.state.confirmPassword)}}>
              <Text style={styles.textstyle}>Register</Text>
              
              </TouchableOpacity>
              
              </View>
              
              
          
              <TouchableOpacity
                style={styles.submitbutton}
                onPress={() => {this.setState({modalVisible:false})}}
              >
                <Text style={styles.textstyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </View>
    )
  }

  login = async (email, password) => {
    console.log('login1');
    if (email && password) {
      console.log('login2');
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password).then(()=>{this.props.navigation.navigate('Post')});
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert('User does not exist');
            console.log('user does not exist');
            break;
          case 'auth/invalid-email':
            Alert.alert('Email is invalid');
            console.log('Email is invalid');
            break;
        }
      }
    } else {
      Alert.alert('Enter email and password');
      console.log('Enter email and password');
    }
  };

  signup = async (email, password,confirmpass) => {

    if (password != confirmpass){
      Alert.alert("Passwords are not matching")
    }
    else{

      console.log('Inside sign up')

       
        

      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(()=>{

        console.log('databse connected')

          db.collection('USERS').add({
              'First_Name':this.state.firstName,
              'Last_Name':this.state.lastName,
              'Contact':this.state.contact,
              'Email':email

        })

        return(
          Alert.alert("User Added Successfully"," ", [{text:'OK',onPress:()=>this.setState({modalVisible:false})}])

        )
      })

      .catch((error)=>{
        var errorcode=error.code;
        var errormessage=error.message;
        return(
          console.log(error),
          Alert.alert(errormessage)
        )

      })
    
    } 

   // this.props.navigation.navigate('Post',{username:this.state.username});
  };

  render() {
    return (
      <View style={styles.container}>
     
      

      <View style={styles.container}>
          <Image
            source={require('../assets/notes_buddy_logo.png')}
            style={{ width: 320, height: 230, marginBottom: 80 }}
          />

          <View style={{flexDirection:'row'}}>


            <TextInput
              style={styles.inputstyle}
             // inlineImageLeft:{'../assets/emailicon.png'}
              placeholder="Email ID"
              placeholderTextColor="#FE6D73"
              keyboardType="email-address"
              onChangeText={(text) => this.setState({ emailid: text })}
              value={this.state.emailid}
            />

            <Image
              source={require('../assets/emailicon.png')}
              style={{ width: 20, height: 20,marginTop:20}}
            />
          </View>

          <View style={{flexDirection:'row'}}>

            <TextInput
              style={styles.inputstyle}
              placeholder="Password"
              placeholderTextColor="#FE6D73"
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
            />

              <Image
              source={require('../assets/passwordicon.png')}
              style={{ width: 26, height: 26,marginTop:20}}
            />
          </View>

          <TouchableOpacity
            style={styles.submitbutton}
         onPress={() => {this.setState({modalVisible:true})}}>
            <Text style={styles.textstyle}>Sign Up</Text>
          </TouchableOpacity>
        

        <View>
          <Text style={[styles.textstyle, { color: '#227C9D' }]}>
            Already Registered?
          </Text>

          <TouchableOpacity
            style={styles.submitbutton}
            onPress={async () => {
              this.login(this.state.emailid, this.state.password);
            }}>
            <Text style={[styles.textstyle, { fontSize: 13.5 }]}>Sign in</Text>
          </TouchableOpacity>
        </View>

      </View>

       <View style={{justifyContent:'center',alignItems:'center'}}>

      {this.showmodal()}

      </View>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#81B29A',
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
    backgroundColor:'yellow'

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