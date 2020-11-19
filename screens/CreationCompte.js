import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';
import * as firebase from 'firebase';

const CreationCompte = ({route, navigation}) => {

    return(
        <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Nom d'utilisateur:</Text>
        <TextInput
          style={styles.txtInput}
          onChangeText={(nomSalon) => setNomSalon(nomSalon)}
          value={nomSalon}
        />
        <Text style={styles.formLabel}>Mot de passe:</Text>
        <TextInput
          style={styles.txtInput}
          placeholder = "(optionnel)"
          onChangeText={(motDePasse) => setmotDePasse(motDePasse)}
          value={motDePasse}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            ajouterSalon();
            navigation.navigate('Salon', {salonId: tempSalonId, title: nomSalon, password: motDePasse});
          }}>
            <Text style={styles.buttonBlue}>Créer</Text>
        </TouchableOpacity>
        </View>
    )
}

export default CreationCompte;