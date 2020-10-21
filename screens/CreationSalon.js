import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles';

const CreationSalon = ({route}) => {
  const [nomSalon, setNomSalon] = useState("");
  const [motDePasse, setmotDePasse] = useState("");

  function ajouterSalon(){
    console.log(nomSalon);
    console.log(motDePasse);
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