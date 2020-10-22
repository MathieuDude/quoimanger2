import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import restoImg from '../Resto.jpg';

const PropositionResto = ({route}) => {
    const DATA = [
        {
            id: 1,
            name: 'Les Passiones',
            image: {restoImg}
        }
    ];
    return (
        <View style={styles.propoContainer}>
            <Image style={styles.imgResto} source={restoImg}/>
            <Text style={styles.nomResto}>ALLo</Text>
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
    );
}

export default PropositionResto;

{/* pour image voir lab film de session 4 */}