import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
//navigation
import { createStackNavigator } from '@react-navigation/stack';


import ApiKeys from './ApiKeys';

//checks if firebase is initialized and initializes it if not
if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}


const dbh = firebase.firestore();


export default class App extends React.Component {

  constructor(props)
  {
    super(props);
    
    this.state= {
      isLoadingComplete: false,
    }
  }


  render (){
    return(
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
