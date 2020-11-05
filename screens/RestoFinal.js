import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import ApiKeys from '../ApiKeys';

const RestoFinal = ({route}) => {
    const {resto} = route.params;

    function RenderPage(){
        return (
        <View style={styles.propoContainer}>
            <Image style={styles.imgResto} source={{uri: resto[0].gallery[0]}}/>
            <Text style={styles.nomResto}>{resto[0].name}</Text>
            <Text style={styles.nomResto}> Numero de telephone </Text>
            <Text style={styles.nomResto}> adresse </Text>
            <Text style={styles.nomResto}> site web </Text>
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
export default RestoFinal;