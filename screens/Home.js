import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, FlatList} from 'react-native';
import SalonItem from '../components/SalonItem';
import styles from '../styles';
import ApiKeys from '../ApiKeys';


import * as firebase from 'firebase';

if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

//initialize DB
const dbh = firebase.firestore();

//TODO: linker les données avec la BD pour les afficher dans la flatlist
const DATA = [
  {
    salonId: 1,
    title: 'Salon de Jul',
  },

];

//FONCTIONNEL PLUS OU MOINS

//.where("active", "==", true)
//GETS THE LOBBIES AND PUSHES THEM TO DATA
dbh.collection("lobbies")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            useableData.push(doc.data());
            console.log(DATA);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });





const Home = (navigation) => {

    const [useableData, setData] = useState(DATA);

    

    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.sousTitre}>Salons</Text>
            <FlatList
                data={useableData}
                keyExtractor={item => item.salonId}
                renderItem={({item}) =>
                <SalonItem salonItem={item} nav={navigation}/>
                }
            />
        </View>
    );
}

export default Home;