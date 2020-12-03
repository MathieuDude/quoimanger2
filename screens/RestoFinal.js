import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import styles from '../styles';

const RestoFinal = ({route, navigation}) => {
    const {winnerRestoData} = route.params;
    const {allRestoData} = route.params;
    const {salonID} = route.params;


    const [isLoading, setisLoading] = useState(true);

    function setLeaveListeners(){
        navigation.setOptions({
            headerLeft: () => <HeaderBackButton onPress={() => { leavePage(); }}/>
        });
        BackHandler.addEventListener("hardwareBackPress", () => {  leavePage(); return true; });
    }

    if(isLoading){
        setLeaveListeners();
        setisLoading(false);
    }

    //TODO: enlever la personne qui a quitté, effacer le lobby quand cest le dernier
    //      (optimisation importante, mais n'affecte pas le fonctionnement front-end pour l'instant)
    function leavePage(){
        navigation.popToTop();
    }

    return (
    <View style={styles.restoPropositionContainer}>
        <Image style={styles.imgResto} source={{uri: winnerRestoData.gallery[0]}}/>
        <Text style={styles.nomResto}>{winnerRestoData.name}</Text>
        <Text style={styles.adresseResto}>{winnerRestoData.address}</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { leavePage(); }}>
            <Text style={styles.buttonBlue}>Retourner à l'acceuil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { navigation.navigate("Leaderboard", {allRestoData: allRestoData, salonID:salonID}); }}>
            <Text style={styles.buttonGreen}>Voir les autres options</Text>
        </TouchableOpacity>
    </View>
    )
 }

export default RestoFinal;