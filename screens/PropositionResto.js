import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';

const PropositionResto = ({route}) => {
    return (
        <View style={styles.formContainer}>
            <TouchableOpacity style={styles.buttonVote} onPress={() => voterOui()}>
                <Ionicons name="md-checkmark" size={75} color="green"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonVote} onPress={() => voterNon()}>
                <Ionicons name="md-close" size={75} color="red"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonVote} onPress={() => voterSuper()}>
                <Ionicons name="ios-restaurant" size={75} color="blue"/>
            </TouchableOpacity>
        </View>
    );
}

export default PropositionResto;

{/* pour image voir lab film de session 4 */}