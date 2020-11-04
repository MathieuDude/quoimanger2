import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles';
import * as firebase from 'firebase';
import ApiKeys from '../ApiKeys';


const dbh = firebase.firestore();


const CreationSalon = ({route, navigation}) => {
  const [nomSalon, setNomSalon] = useState("");
  const [motDePasse, setmotDePasse] = useState("");
  const [placesDetails, setPlacesDetails] = useState([]);


  const fetchNearestPlacesFromGoogle = () => {
    const latitude = 45.643894; // you can update it with user's latitude & Longitude
    const longitude = -73.843219;
    let radMetter = 5 * 100; // Search withing 500M
    const photoMaxWidth = 712;
    const photoMaxHeight = 1024;
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&type=restaurant' + '&key=' + ApiKeys.googleMapsAPI.key
    
    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(res => {
        if(res.status !== "ZERO_RESULTS")
        {
            var placesId = 0;
            var places = []; // This Array WIll contain locations received from google
            for(let googlePlace of res.results) {
                var place = {}
                var lat = googlePlace.geometry.location.lat;
                var lng = googlePlace.geometry.location.lng;
                var coordinate = {
                    latitude: lat,
                    longitude: lng,
                }
    
                var gallery = []
                if (googlePlace.photos) {
                    for(let photo of googlePlace.photos) {
                        var photoUrl = ApiKeys.googleMapsAPI.googlePicBaseUrl + 'photoreference=' + photo.photo_reference + '&key=' + ApiKeys.googleMapsAPI.key + '&maxwidth=' + photoMaxWidth + '&maxheight=' + photoMaxHeight;
                        gallery.push(photoUrl);
                    }
                }

                place['id'] = placesId++;
                place['coordinate'] = coordinate;
                place['googlePlaceId'] = googlePlace.place_id;
                place['name'] = googlePlace.name;
                place['gallery'] = gallery;
                places.push(place);
            }
            setPlacesDetails(places);
        }
        else{
            //avertir l'usager qu'aucun resto n'a ete trouvé
            Alert.alert("Aucun resto trouvé. SVP Réessayer.");
        }
      })
      .catch(error => {
        console.log(error);
    });
  }

  function ajouterSalon(){
    console.log(nomSalon);
    console.log(motDePasse);

    dbh.collection("lobbies").add({
      salonId: tempSalonId,
      title: nomSalon,
      password: motDePasse,
      restoData: placesDetails
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  

  fetchNearestPlacesFromGoogle();
  var tempSalonId = getRandomInt(0, 999999999999999999);

  

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
          ajouterSalon()
          navigation.navigate('Salon', {salonId: tempSalonId, title: nomSalon, password: motDePasse})
          }}>
            <Text style={styles.buttonBlue}>Créer</Text>
        </TouchableOpacity>
      </View>
  );
}

export default CreationSalon;