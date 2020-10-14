import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, FlatList, ActivityIndicator} from 'react-native';
import SalonItem from '../components/SalonItem';
import styles from '../styles';
import ApiKeys from '../ApiKeys';


import * as firebase from 'firebase';

if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

//initialize DB
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


//REWRITE WITH A CLASS??


const Home = (navigation) => {

    const dbh = firebase.firestore();

    dbh.collection("lobbies")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
    
                // setIsLoading(true);
                // console.log(doc.id, " => ", doc.data());
                DATA.concat(doc.data());
                console.log('FUCK');
    
                
            });
            // setIsLoading(false);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    const [isLoading, setIsLoading] = useState(false);

    

    const [useableData, setData] = useState(DATA);

    console.log(useableData);

    if(isLoading){
        return(
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        )
    }
    else{
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
    

    
}

export default Home;