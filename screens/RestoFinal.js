import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import styles from '../styles';

const RestoFinal = ({route, navigation}) => {
    const {restoData} = route.params;

    const [isLoading, setisLoading] = useState(true);

    function setLeaveListeners(){
        navigation.setOptions({
            headerLeft: null,
        });
        BackHandler.addEventListener("hardwareBackPress", () => {  leavePage(); return true; });
    }

    if(isLoading){
        setLeaveListeners();
        setisLoading(false);
    }

    function leavePage(){
        navigation.popToTop();
    }

    return (
    <View style={styles.restoPropositionContainer}>
        <Image style={styles.imgResto} source={{uri: restoData.gallery[0]}}/>
        <Text style={styles.nomResto}>{restoData.name}</Text>
        <Text style={styles.adresseResto}>{restoData.address}</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { leavePage(); }}>
            <Text style={styles.buttonBlue}>Retourner à l'acceuil</Text>
        </TouchableOpacity>
    </View>
    )
 }

export default RestoFinal;