import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles';
import * as firebase from 'firebase';

const dbh = firebase.firestore();


const CreationSalon = ({route}) => {
  const [nomSalon, setNomSalon] = useState("");
  const [motDePasse, setmotDePasse] = useState("");

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  function ajouterSalon(){
    console.log(nomSalon);
    console.log(motDePasse);

    dbh.collection("lobbies").add({
      salonId: getRandomInt(0, 999999999999999999),
      title: nomSalon,
      password: motDePasse
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  return(
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Nom du salon:</Text>
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
        <TouchableOpacity style={styles.buttonContainer} onPress={() => ajouterSalon()}>
            <Text style={styles.buttonBlue}>Créer</Text>
        </TouchableOpacity>
      </View>
  );
}

export default CreationSalon;