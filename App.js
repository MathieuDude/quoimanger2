import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

import ApiKeys from './ApiKeys';

firebase.initializeApp(ApiKeys.firebaseConfig);


export default class App extends React.Component {

  constructor(props)
  {
    super(props);
    
    this.state= {
      isLoadingComplete: false,
    }

    if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

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
