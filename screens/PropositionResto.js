import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import ApiKeys from '../ApiKeys';


const PropositionResto = ({route}) => {
    const [currViewedPlaceId, setcurrViewedPlaceId] = useState(0);
    const [placesDetails, setPlacesDetails] = useState([]);
    const [detailsLoaded, setDetailsLoaded] = useState(false);

    const fetchNearestPlacesFromGoogle = () => {
        const latitude = 45.643894; // you can update it with user's latitude & Longitude
        const longitude = -73.843219;
        let radMetter = 5 * 100; // Search withing 2 KM radius
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
                //TODO: avertir l'usager qu'aucun resto n'a ete trouvé
                console.log("Zero resultat");
            }
          })
          .catch(error => {
            console.log(error);
        });
    }

    function getPlaceDetails(placeID){
        //Pour get plusieurs photos, à voir dans un futur raproché
    }
    function afficherProchainResto(){
        if(currViewedPlaceId < placesDetails.length - 1)
            setcurrViewedPlaceId(currViewedPlaceId + 1);
        else{
            console.log("vote termine");
        }
    }
    function voterOui(){
        afficherProchainResto()
    }
    function voterNon(){
        afficherProchainResto()
    }
    function voterSuper(){
        afficherProchainResto()
    }

    if(!detailsLoaded){
        fetchNearestPlacesFromGoogle();
        setDetailsLoaded(true);
    }

    function RenderPage(){
        return (
        <View style={styles.propoContainer}>
            <Image style={styles.imgResto} source={{uri: placesDetails[currViewedPlaceId].gallery[0]}}/>
            <Text style={styles.nomResto}>{placesDetails[currViewedPlaceId].name}</Text>
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

export default PropositionResto;

{/* pour image voir lab film de session 4 */}