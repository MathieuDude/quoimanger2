import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import styles from '../styles';

const RestoFinal = ({route}) => {
    const {restoData} = route.params;

        return (
        <View style={styles.propoContainer}>
            <Image style={styles.imgResto} source={{uri: restoData.gallery[0]}}/>
            <Text style={styles.nomResto}>{restoData.name}</Text>
            <Text style={styles.nomResto}>{restoData.address}</Text>
        </View>
        )
    }

export default RestoFinal;