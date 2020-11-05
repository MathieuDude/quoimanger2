import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import ApiKeys from '../ApiKeys';

const dbh = firebase.firestore();

import * as firebase from 'firebase';

if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

const PropositionResto = ({route, navigation}) => {

    const {salonID} = route.params;
    const [currViewedPlaceId, setcurrViewedPlaceId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [placesDetails, setPlacesDetails] = useState([]);
    //TODO: Update le nombre de participants avec la liste
    const [nbParticipants, setNbParticipants] = useState(2);
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

    function checkVotes(){
        salonActuel.get().then(function(doc){
            if(doc.exists)
            {
                var data = doc.data();
                for(var [key, nbVote] of Object.entries(data.votes)){
                    if(nbVote >= nbParticipants) {
                        var id = parseInt(key);
                        navigation.navigate("RestoFinal", {restoData: placesDetails[id]});
                    }
                }   
            }
            else {
                console.log("ERREUR VOTES");
            }
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
        afficherProchainResto();
    }

    if(isLoading){
        getRestoData();
        setIsLoading(false);
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
            {/*<TouchableOpacity style={styles.buttonVote} onPress={() => voterSuper()}>
                <Ionicons name="ios-restaurant" size={75} color="blue"/>
            </TouchableOpacity>*/}
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