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

var salonsData = [
    // {
    //     salonId: 2,
    //     title: 'Salon de Jul',
    // }
];



const Home = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);

    //jai transplanter ceci dans une fonction pour poouvoir eventuellement mettre un bouton refresh
    function getLobbies()
    {
        dbh.collection("lobbies")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    
                    
                    console.log('doc.data:');
                    console.log(doc.data());
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

    if(isLoading == true){
        
        getLobbies();
    }

    console.log('DATA FINAL:');
    console.log(salonsData);


        return(
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Text style={styles.sousTitre}>Salons</Text>
                <FlatList
                    data={salonsData}
                    keyExtractor={item => item.salonId}
                    renderItem={({item}) =>
                        <SalonItem salonItem={item} nav={{navigation}}/>
                    }
                />
                
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('PropositionResto')}>
                    <Text style={styles.buttonBlue}>
                        Test Resto
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('CreationSalon')}>
                    <Text style={styles.buttonBlue}>
                        Nouveau Salon
                    </Text>
                </TouchableOpacity> 
            </View>
        );
}

export default Home;