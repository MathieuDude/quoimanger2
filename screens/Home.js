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
//TODO: linker les données avec la BD pour les afficher dans la flatlist

const DATA = [
    {
        salonId: 2,
        title: 'Salon de Jul',
    }
];

const Home = (navigation) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    var tempDATA = DATA;

    if(isLoading == true){
        dbh.collection("lobbies")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log('doc.data:');
                console.log(doc.data());
                //this does not work obviously
                tempDATA.push({   
                    "salonId": doc.get('salonId'),
                    "title": doc.get('title')
                });
                    
                

                console.log('tempData:');
                console.log(tempDATA); 

                setData(tempDATA);

            });
            setIsLoading(false)
            
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

        console.log('DATA FINAL:');
        console.log(data);
        
    }

    


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
                <FlatList
                    data={tempDATA}
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