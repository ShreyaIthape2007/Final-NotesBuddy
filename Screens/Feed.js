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
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { List } from 'react-native-paper';
import * as firebase from 'firebase';
import database from '../config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NotesDetails from './NotesDetails';
import { Dimensions } from 'react-native';
import AppHeader from '../components/AppHeader'

export default class Feed extends React.Component {

  constructor(props) {
    super(props),
      (this.state = {
        postlist: [],
        lastVisiblePosts: null,
        search: '',
      });
  }

  getPosts = async () => {
    console.log('in getPosts');
    const query = await database
      .collection('All_Posts')
      .onSnapshot((snapshot) => {
        var allPosts = snapshot.docs.map((document) => document.data());
        console.log(allPosts);
        this.setState({
          postlist: allPosts,
        });
      });

   console.log(this.state.postlist);
  };

  componentDidMount = () => {
    console.log('in component did mount');
    this.getPosts();
  };

  fetchmorePosts = async () => {
    const query = await database
      .collection('All_Posts')
      .startAfter(this.state.lastVisiblePosts)
      .limit(1)
      .get();
    query.docs.map((doc) => {
      console.log(doc.data());
      var req = doc.data();

      this.setState({
        postlist: [...this.state.allPosts, req],
        lastVisiblePosts: doc,
        search: '',
      });
    });
    console.log(this.state.postlist);
  };

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>


    

          <FlatList
          //style={styles.flatliststyle}
            data={this.state.postlist}
            renderItem={({ item, i }) => {
              return (
                <ListItem key={i} bottomDivider style={{backgroundColor:'#17C3B2'}}>
                  <ListItem.Content
                    style={{
                      justifyContent: 'space-evenly',
                      margin:2,
                      backgroundColor:'#17C3B2',
                      alignItems:'center',
                      width:Dimensions.get('window').width
                      
                                          }}>
                    <ListItem.Title
                      style={{
                        color: 'black',
                        fontFamily: 'futura',
                        fontWeight: 'bold',
                        fontSize: 20,

                      }}>
                      {item.Description}
                    </ListItem.Title>
                    <ListItem.Subtitle
                     style={{
                      color: 'black',
                      fontFamily: 'monospace',
                      fontSize: 15,
                      flexWrap: 'wrap',
                    }}>
                     By : {item.UserID}
                    </ListItem.Subtitle>
                    <TouchableOpacity
                      style={styles.submitbutton}
                      onPress={() => {
                        this.props.navigation.navigate('NotesDetails', {
                          details: item,
                        });
                      }}
                      >
                      <Text style={styles.textstyle}>
                        View More
                      </Text>
                    </TouchableOpacity>
                  </ListItem.Content>
                </ListItem>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.fetchmorePosts}
            onEndReachedThreshold={0.7}></FlatList>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F19C79',
  },

  textstyle: {
    fontSize: 15,
    fontFamily: 'futura',
    marginLeft:32,
    marginTop:5
  },

  inputstyle: {
    height: 50,
    width: 300,
    margin: 10,
    borderBottomWidth: 2,
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
  flatliststyle: {
    backgroundColor: '#D4E09B',
    width: 250,
    height: 100,
    paddingLeft: 10,
    paddingTop: 7,
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
  },
  textstylebutton: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Futura',
    marginTop: 5,
  },
});