import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ToastAndroid, BackHandler } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import ApiKeys from '../ApiKeys';

const dbh = firebase.firestore();

import * as firebase from 'firebase';

if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

const PropositionResto = ({route, navigation}) => {
    const {salonID} = route.params;
    const {participants} = route.params;

    const [currViewedPlaceId, setcurrViewedPlaceId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [placesDetails, setPlacesDetails] = useState([]);
    const [nbParticipants, setNbParticipants] = useState(participants);
    const salonActuel = dbh.collection("lobbies").doc(salonID.toString());
    var voteId = 0;

    function getRestoData()
    {
        dbh.collection("lobbies").where("salonId", "==", salonID)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    setPlacesDetails(doc.get('restoData'));
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    }

    function setLeaveListeners(){
        navigation.setOptions({
            headerLeft: null
        });
        BackHandler.addEventListener("hardwareBackPress", () => {return true});
    }


    function getPlaceDetails(placeID){
        //Pour get plusieurs photos, à voir dans un futur raproché
    }

    function afficherProchainResto(){
        if(currViewedPlaceId < placesDetails.length - 1)
            setcurrViewedPlaceId(currViewedPlaceId + 1);
        else {
            navigation.navigate("Leaderboard", {allRestoData: placesDetails, salonID:salonID});
        }
    }

    function checkVotes(){
        salonActuel.get().then(function(doc){
            if(doc.exists)
            {
                var data = doc.data();
                for(var [key, nbVote] of Object.entries(data.votes)){
                    if(nbVote >= nbParticipants) {
                        var id = parseInt(key);
                        navigation.navigate("RestoFinal", {winnerRestoData: placesDetails[id], allRestoData: placesDetails, salonID: salonID});
                    }
                }   
            }
            else {
                ToastAndroid.show("Erreur document inexistant");
            }
        }).catch(function(error) {
            ToastAndroid.show("Erreur inatendue");
        });
    }

    function voterOui(){
        voteId = "votes."+ currViewedPlaceId;
        salonActuel.update({
            [voteId]:firebase.firestore.FieldValue.increment(1)
        })
        .then(checkVotes());
        
        afficherProchainResto();
    }

    function voterNon(){
        checkVotes();
        afficherProchainResto();
    }

    if(isLoading){
        getRestoData();
        setLeaveListeners();
        setIsLoading(false);
    }

    function RenderPage(){
        return (
        <View style={styles.restoPropositionContainer}>
            <Image style={styles.imgResto} source={{uri: placesDetails[currViewedPlaceId].gallery[0]}}/>
            <Text style={styles.nomResto}>{placesDetails[currViewedPlaceId].name}</Text>
            <View style={styles.voteContainer}>
                <TouchableOpacity style={styles.buttonVoteRed} onPress={() => voterNon()}>
                    <Ionicons name="md-close" size={90} color="red"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonVoteGreen} onPress={() => voterOui()}>
                    <Ionicons name="md-checkmark" size={90} color="green"/>
                </TouchableOpacity>
            </View>
        </View>
        )
    }

    function LoadingScreen(){
        return( 
            <View style={styles.restoPropositionContainer}>
                <Text style={{fontSize: 42}}>Loading...</Text>
            </View>
        );
    }

    return placesDetails.length ? RenderPage() : LoadingScreen()
}

export default PropositionResto;

{/* pour image voir lab film de session 4 */}