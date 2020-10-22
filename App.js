import React from 'react';
import * as firebase from 'firebase';

//navigation
import 'react-native-gesture-handler';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
//local files
import Header from './components/Header';
import Home from './screens/Home';
import Salon from './screens/Salon';
import CreationSalon from './screens/CreationSalon';
import PropositionResto from './screens/PropositionResto';
import styles from './styles';

import ApiKeys from './ApiKeys';

//checks if firebase is initialized and initializes it if not
if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

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
          <Stack.Screen
            name="Salon" 
            component={Salon} 
            options={
              ({route}) => ({
                salonId: route.params.salonId, 
                title: route.params.title,
              })
            }
          />
          <Stack.Screen
            name="PropositionResto" 
            component={PropositionResto}
            options={{}}
          />
          <Stack.Screen
            name="CreationSalon" 
            component={CreationSalon}
            options={{title: "Création de salon"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

