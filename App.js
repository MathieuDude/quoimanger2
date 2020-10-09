import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
//navigation
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
//local files
// import ListSalon from './components/ListSalon';
import Header from './components/Header';

import ApiKeys from './ApiKeys';

//checks if firebase is initialized and initializes it if not
if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}


const dbh = firebase.firestore();
const Stack = createStackNavigator();


const DATA = [
  {
    id: 1,
    title: 'salon 1',
  },
  {
    id: 2,
    title: 'salon 2',
  }
];


const Item = ({title}) => (
  <View>
      <Text style={styles.item}>{title}</Text>
  </View>
);

const renderItem = ({item}) => (
  <Item title={item.title} />
);


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
      <StatusBar style="auto" />

      <Header title="QWA MANGER?" />
      <Text style={styles.sousTitre}>Salons</Text>
      
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    flex: 1,
  },
  sousTitre: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      paddingTop: 10,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
  },
  flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
      alignItems: 'center',
  },
  buttonContainer: {
      paddingTop: 10,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 15
  },
  button: {
      width: '45%',
      backgroundColor: '#FFBF00',

      padding: 10
  },
  item: {
      backgroundColor: '#D3D3D3',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16
  }
});
