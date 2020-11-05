import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import styles from '../styles';

const RestoFinal = ({route, navigation}) => {
    const {restoData} = route.params;

        return (
        <View style={styles.restoPropositionContainer}>
            <Image style={styles.imgResto} source={{uri: restoData.gallery[0]}}/>
            <Text style={styles.nomResto}>{restoData.name}</Text>
            <Text style={styles.adresseResto}>{restoData.address}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                navigation.navigate('Home')}}>
                <Text style={styles.buttonBlue}>Retourner à l'acceuil</Text>
            </TouchableOpacity>
        </View>
        )
    }

export default RestoFinal;