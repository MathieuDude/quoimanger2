import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import ApiKeys from '../ApiKeys';
const dbh = firebase.firestore();

import * as firebase from 'firebase';

if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

const PropositionResto = ({route}) => {
    const [currViewedPlaceId, setcurrViewedPlaceId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [detailsLoaded, setDetailsLoaded] = useState(true);
    const [placesDetails, setPlacesDetails] = useState([]);
    //TODO: FIX THE DUPLICATE LOADING STATES

    var salonID = 626220556345361300;

    var restoData = [

    ];

    function getRestoData()
    {
        dbh.collection("lobbies").where("salonId", "==", salonID)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    setPlacesDetails(doc.get('restoData'));
                    
                });
                setDetailsLoaded(false);
                setIsLoading(false);
                
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

    }

    

    function getPlaceDetails(placeID){
        //Pour get plusieurs photos, à voir dans un futur raproché
    }
    function afficherProchainResto(){
        if(currViewedPlaceId < placesDetails.length - 1)
            setcurrViewedPlaceId(currViewedPlaceId + 1);
        else{
            console.log("vote termine");
        }
    }
    function voterOui(){
        afficherProchainResto();
    }
    function voterNon(){
        afficherProchainResto();
    }
    function voterSuper(){
        afficherProchainResto();
    }

    if(isLoading == true){
        getRestoData();
    }

    if(!detailsLoaded){
        
        setDetailsLoaded(true);
    }

    function RenderPage(){
        return (
        <View style={styles.propoContainer}>
            <Image style={styles.imgResto} source={{uri: placesDetails[currViewedPlaceId].gallery[0]}}/>
            <Text style={styles.nomResto}>{placesDetails[currViewedPlaceId].name}</Text>
        <View style={styles.voteContainer}>
            <TouchableOpacity style={styles.buttonVote} onPress={() => voterNon()}>
                <Ionicons name="md-close" size={75} color="red"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonVote} onPress={() => voterSuper()}>
                <Ionicons name="ios-restaurant" size={75} color="blue"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonVote} onPress={() => voterOui()}>
                <Ionicons name="md-checkmark" size={75} color="green"/>
            </TouchableOpacity>
            </View>
        </View>
        )
    }

    function LoadingScreen(){
        return( 
            <View style={styles.voteContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return placesDetails.length ? RenderPage() : LoadingScreen()
}

export default PropositionResto;

{/* pour image voir lab film de session 4 */}