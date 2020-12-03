import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, FlatList, BackHandler } from 'react-native';
import styles from '../styles';
import LeaderboardItem from '../components/LeaderboardItem';
import { HeaderBackButton } from '@react-navigation/stack';

const dbh = firebase.firestore();

import * as firebase from 'firebase';

if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

const Leaderboard = ({route, navigation}) => {
    const {salonID} = route.params;
    const {allRestoData} = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [votesData, setVoteData] = useState(true);

    const salonActuel = dbh.collection("lobbies").doc(salonID.toString());
    var unsubscribe = salonActuel.onSnapshot(function (doc) {});

    const createLeaveAlert = () => {
        Alert.alert(
            "Quitter?",
            "Vous ne pourrez plus revenir sur cette page",
            [
                {
                    text: "Non",
                },
                {
                    text: "Oui",
                    onPress: () => { leavePage(); }
                }
            ]
        )
    }

    function setDBListener(){
        unsubscribe = salonActuel.onSnapshot(function (doc) {
            var data = doc.data();
            let tempArray = []
            for(var [key, nbVote] of Object.entries(data.votes)){
                let id = parseInt(key);
                let resto = allRestoData[id];
                let newData = { resto, nbVote }
                tempArray.push(newData);
            }
            setVoteData(tempArray);
        });
    }

    function leavePage(){
        unsubscribe(); 
        navigation.popToTop();
    }

    function setLeaveListeners(){
        navigation.setOptions({
            headerLeft: () => <HeaderBackButton onPress={() => { createLeaveAlert(); }}/>
        });
        BackHandler.addEventListener("hardwareBackPress", () => { createLeaveAlert(); });
    }

    if(isLoading){
        setDBListener();
        setLeaveListeners();
        setIsLoading(false);
    }

    return(
        <View style={styles.formContainer}>
            <FlatList
                    data={votesData}
                    keyExtractor={item => item.salonId}
                    renderItem={({item}) =>
                        <LeaderboardItem leaderboardItem={item} nav={{navigation}}/>
                    }
                />           
                <TouchableOpacity style={styles.buttonContainer} onPress={() => { createLeaveAlert(); }}>
                    <Text style={styles.buttonBlue}>Retourner à l'acceuil</Text>
                </TouchableOpacity>
        </View>
    );
}

export default Leaderboard;
