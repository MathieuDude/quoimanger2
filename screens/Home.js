import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, FlatList} from 'react-native';
import SalonItem from '../components/SalonItem';
import styles from '../styles';

//TODO: linker les données avec la BD pour les afficher dans la flatlist
const DATA = [
    {
      salonId: 1,
      title: 'Salon de Jul',
    },
    {
      salonId: 2,
      title: 'Salon de Tommy',
    },
    {
      salonId: 3,
      title: 'Salon de Mathieu',
    },
  ];
  
const Home = (navigation) => {
    return(
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.sousTitre}>Salons</Text>
          <FlatList
              data={DATA}
              keyExtractor={item => item.salonId}
              renderItem={({item}) =>
                <SalonItem salonItem={item} nav={navigation}/>
              }
          />
        </View>
    );
}

export default Home;