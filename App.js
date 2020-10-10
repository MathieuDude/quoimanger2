import React from 'react';
import * as firebase from 'firebase';
//navigation
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
//local files
import Header from './components/Header';
import Home from './screens/Home';

import ApiKeys from './ApiKeys';

//checks if firebase is initialized and initializes it if not
if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

const dbh = firebase.firestore();
const Stack = createStackNavigator();

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
      <NavigationContainer>
        <Stack.Navigator initalRouteName="Home">
          <Stack.Screen
            name="Home" 
            component={Home} 
            options={{header: props => <Header title="Quoi manger?"/>}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}