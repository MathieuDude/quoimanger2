import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import ApiKeys from '../ApiKeys';

const dbh = firebase.firestore();

import * as firebase from 'firebase';

if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

const PropositionResto = ({route}) => {

    const {salonID} = route.params;

    const [currViewedPlaceId, setcurrViewedPlaceId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [detailsLoaded, setDetailsLoaded] = useState(true);
    const [placesDetails, setPlacesDetails] = useState([]);

    const [vote, setVote] = useState([]);
    //TODO: FIX THE DUPLICATE LOADING STATES

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
            ToastAndroid.show("vote ternine", ToastAndroid.SHORT);
        }
    }
    function voterOui(){
        //ToastAndroid.show("vote OUI + 1", ToastAndroid.SHORT);
        
        var salon = dbh.collection("lobbies").doc("test1");
        salon.set({
            votes: {1: 0, 2: 0}
        })
        .then(function() {
            ToastAndroid.show("vote OUI + 1", ToastAndroid.SHORT);
        });
        
        afficherProchainResto();

        //countVote(1);

        console.log(vote);

    }
    function voterNon(){
        //ToastAndroid.show("vote NON + 1", ToastAndroid.SHORT);

        var salon = dbh.collection("lobbies").doc("test1");
        salon.update({
            "votes.1":firebase.firestore.FieldValue.increment(1)
        })
        .then(function() {
            ToastAndroid.show("vote NON + 1", ToastAndroid.SHORT);
        });

        afficherProchainResto();

        console.log(vote);
    }
    function voterSuper(){
        ToastAndroid.show("vote SUPER + 1", ToastAndroid.SHORT);
        afficherProchainResto();

        console.log(vote);
    }
    function countVote(voteVal)
    {
        if(vote.length < 1)
        {
            //TODO: FINISH VOTE
            // const prevVote = new Array(vote);
            // prevVote.push({ currViewedPlaceId: 1 });
            setVote([voteVal]);
        }
        else{
            setVote({...vote, voteVal });
        }
        
        

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