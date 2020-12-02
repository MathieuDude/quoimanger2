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

var salonsData = [];

const Home = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [salonData, setSalonData] = useState([]);

    const lobbies = dbh.collection("lobbies");
    var unsubscribe = lobbies.onSnapshot(function (doc) {});

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
                setSalonData(salonsData);
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

    }

    function setDBListener(){
        lobbies.onSnapshot(function (doc) {
            salonsData = [];
            doc.forEach(function (data){
                salonsData.push({   
                    "salonId": data.get('salonId'),
                    "title": data.get('title'),
                    "password": data.get('password')
                });
            });
            setSalonData(salonsData);
        });
    }

    if(isLoading){
        setDBListener();
        setIsLoading(false);
    }

    function RenderPage(){
        return(
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Text style={styles.sousTitre}>Les salons:</Text>
                <FlatList
                    data={salonData}
                    keyExtractor={item => item.salonId}
                    renderItem={({item}) =>
                        <SalonItem salonItem={item} nav={{navigation}}/>
                    }
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => { navigation.navigate('PreCreationSalon'); unsubscribe(); }}>
                    <Text style={styles.buttonBlue}>
                        Nouveau Salon
                    </Text>
                </TouchableOpacity> 
            </View>
        );
    }

    function LoadingScreen(){
        return( 
            <View style={styles.restoPropositionContainer}>
                <Text style={{fontSize: 42}}>Loading...</Text>
            </View>
        );
    }

    return salonsData.length ? RenderPage() : LoadingScreen()
}

export default Home;