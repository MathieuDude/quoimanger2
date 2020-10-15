import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, FlatList, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import SalonItem from '../components/SalonItem';
import styles from '../styles';
import ApiKeys from '../ApiKeys';

import * as firebase from 'firebase';

if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

//initialize DB
const dbh = firebase.firestore();

var salonsData = [
    {
        salonId: 2,
        title: 'Salon de Jul',
    }
];

const Home = (navigation) => {
    const [isLoading, setIsLoading] = useState(true);

    if(isLoading == true){
        dbh.collection("lobbies")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log('doc.data:');
                console.log(doc.data());
                salonsData.push({   
                    "salonId": doc.get('salonId'),
                    "title": doc.get('title')
                });

            });
            setIsLoading(false);
            
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    console.log('DATA FINAL:');
    console.log(salonsData);
    console.log(navigation);

    // if(isLoading){
    //     return(
    //       <View style={styles.preloader}>
    //         <ActivityIndicator size="large" color="#9E9E9E"/>
    //       </View>
    //     )
    // }
    // else{
        return(
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Text style={styles.sousTitre}>Salons</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CreationSalon')}>
                    <Text style={styles.btnNavCreationSalon}>
                        <AntDesign name="pluscircleo" size={32} color="green" style={styles.paddingRight}/>
                        Nouveau Salon
                    </Text>
                </TouchableOpacity> 
                <FlatList
                    data={salonsData}
                    keyExtractor={item => item.salonId}
                    renderItem={({item}) =>
                        <SalonItem salonItem={item} nav={navigation}/>
                    }
                />
            </View>
        );
    // }
}

export default Home;