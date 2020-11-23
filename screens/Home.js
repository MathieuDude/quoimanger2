import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, FlatList, ActivityIndicator} from 'react-native';
import SalonItem from '../components/SalonItem';
import styles from '../styles';
import ApiKeys from '../ApiKeys';

import * as firebase from 'firebase';

if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

//initialize DB
const dbh = firebase.firestore();

//TODO salon data dans un setState, refresh la page a chauqe insertion (comme dans Salon.js)
var salonsData = [

];

const Home = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);

    function getLobbies()
    {
        dbh.collection("lobbies")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    salonsData.push({   
                        "salonId": doc.get('salonId'),
                        "title": doc.get('title'),
                        "password": doc.get('password')
                    });

                });
                setIsLoading(false);
                
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

    }

    if(isLoading){
        getLobbies();
    }


    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.sousTitre}>Les salons:</Text>
            <FlatList
                data={salonsData}
                keyExtractor={item => item.salonId}
                renderItem={({item}) =>
                    <SalonItem salonItem={item} nav={{navigation}}/>
                }
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('PreCreationSalon')}>
                <Text style={styles.buttonBlue}>
                    Nouveau Salon
                </Text>
            </TouchableOpacity> 
        </View>
    );
}

export default Home;