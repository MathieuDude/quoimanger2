import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, FlatList} from 'react-native';
import SalonItem from '../components/SalonItem';
import styles from '../styles';

//Data temporaire pour tests seulement
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

const renderItem = ({item, navigation}) => (
    //Passer cette balise directement dans la flatlist ne fonctionnais pas :(
    <SalonItem salonItem={item} navigation={navigation}/>
  );
  
const Home = (navigation) => {
    return(
        <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.sousTitre}>Salons</Text>
        <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
        </View>
    );
}

export default Home;