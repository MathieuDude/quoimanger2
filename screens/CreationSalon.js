import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';
import * as firebase from 'firebase';
import ApiKeys from '../ApiKeys';


const dbh = firebase.firestore();


const CreationSalon = ({route, navigation}) => {
    const {searchRadius} = route.params;
    const {searchCoords} = route.params;
    const [nomSalon, setNomSalon] = useState("");
    const [motDePasse, setmotDePasse] = useState("");
    const [placesDetails, setPlacesDetails] = useState([]);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var tempSalonId = getRandomInt(0, 999999999999999999);
    var salonIdString = tempSalonId.toString();

    const fetchNearestPlacesFromGoogle = () => {
      const photoMaxWidth = 712;
      const photoMaxHeight = 1024;
      const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + searchCoords.latitude + ',' + searchCoords.longitude + '&radius=' + searchRadius*1000 + '&type=restaurant' + '&key=' + ApiKeys.googleMapsAPI.key
      
      fetch(url)
          .then(res => {
              return res.json();
          })
          .then(res => {
              if(res.status !== "ZERO_RESULTS")
              {
                  var placesId = 0;
                  var places = [];
                  for(let googlePlace of res.results) {
                      var place = {};

          
                      var gallery = [];
                      if (googlePlace.photos) {
                          for(let photo of googlePlace.photos) {
                              var photoUrl = ApiKeys.googleMapsAPI.googlePicBaseUrl + 'photoreference=' + photo.photo_reference + '&key=' + ApiKeys.googleMapsAPI.key + '&maxwidth=' + photoMaxWidth + '&maxheight=' + photoMaxHeight;
                              gallery.push(photoUrl);
                          }
                      }

                      place['id'] = placesId++;
                      place['googlePlaceId'] = googlePlace.place_id;
                      place['name'] = googlePlace.name;
                      place['gallery'] = gallery;
                      place['address'] = googlePlace.vicinity;
                      //place['rating'] = googlePlace.rating;

                      places.push(place);
                  }
                  setPlacesDetails(places);
              }
              else {
                  //avertir l'usager qu'aucun resto n'a ete trouvé
                  Alert.alert("Aucun resto trouvé. SVP Réessayer.");
                  navigation.goBack();
              }
          })
          .catch(error => {
              console.log(error);
      });
    }

  function ajouterSalon(){
    let emptyArray = [];
    let tempNomSalon = "Salon" + salonIdString;
    let tempPassword = "";
    if (nomSalon.length > 0)
      tempNomSalon = nomSalon;
    if (motDePasse.length > 0)
      tempPassword = motDePasse;
    
    //Template pour la creation d'un salon, certain champs serons vide
    dbh.collection("lobbies").doc(salonIdString).set({
      salonId: salonIdString,
      title: tempNomSalon,
      password: tempPassword,
      restoData: placesDetails,
      isJoinable: true,
      users: emptyArray,
      votes: {0:0}
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  if(placesDetails.length == 0) {
    fetchNearestPlacesFromGoogle();
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
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            ajouterSalon();
            navigation.navigate('Salon', {salonId: salonIdString, title: nomSalon, password: motDePasse});
          }}>
            <Text style={styles.buttonBlue}>Créer</Text>
        </TouchableOpacity>
      </View>
  );
}

export default CreationSalon;