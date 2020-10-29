import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import googleAPIKey from '../ApiKeys';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import restoImg from '../Resto.jpg';
import McDoImg from '../McDo.jpg';
import subImg from '../sub.jpg';
import ApiKeys from '../ApiKeys';




const PropositionResto = ({route}) => {
    //var compteur = 0;
    const [affichage, setAffichage] = useState([]);
    const [details, setDetails] = useState([])
    const [detailsDone, setDetailsDone] = useState(false);
<<<<<<< Updated upstream

    fetchNearestPlacesFromGoogle = () => {

        const latitude = 45.643894; // you can update it with user's latitude & Longitude
        const longitude = 73.843219;
        let radMetter = 5 * 100; // Search withing 2 KM radius
    
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&key=' + googleAPIKey
    
        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(res => {
    
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
                        var photoUrl = Urls.GooglePicBaseUrl + photo.photo_reference;
                        gallery.push(photoUrl);
                    }
                }
    
                place['placeTypes'] = googlePlace.types;
                place['coordinate'] = coordinate;
                place['placeId'] = googlePlace.place_id;
                place['placeName'] = googlePlace.name;
                place['gallery'] = gallery;
        
                places.push(place);
                console.log('COLISSS');
            }
    
            setDetails(places);
            console.log(details);
          })
          .catch(error => {
            console.log(error);
          });
        
    }



    /*const DATA = [
=======
    const DATA = [
>>>>>>> Stashed changes
        {
            id: 0,
            name: 'Les Passionnés',
            image: restoImg
        },
        {
            id: 1,
            name: 'McDonalds',
            image: McDoImg
        },
        {
            id: 2,
            name: 'Subways',
            image: subImg
        }
<<<<<<< Updated upstream
    ];*/



    //fonction de vote
=======
    ];
    const getDetails = async() => {
        //fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=restaurant&inputtype=textquery&fields=name,photos&locationbias=circle:2000@45.643894, -73.843219&key=AIzaSyCzrs5G1Aw5jLQ_Oeafyg3G6T68VNT01Rs").then(res => res.json()).then(resp => DATA = resp);
        //const rep = await fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.643894, -73.843219&radius=500&type=restaurant&key=AIzaSyCzrs5G1Aw5jLQ_Oeafyg3G6T68VNT01Rs");
        const res = await rep.json();
        setDetails(res);
        console.log("DETAILS GET");
        console.log(details);
    }
>>>>>>> Stashed changes
    function voterOui(){
        var id = affichage.id + 1;
        setAffichage({id: DATA[id].id, name: DATA[id].name, image: DATA[id].image});
        //compteur = compteur + 1;
        //setAffichage({name: details[compteur].name, image: details[compteur].icon});
    }
    function voterNon(){
        var id = affichage.id + 1;
        setAffichage({id: DATA[id].id, name: DATA[id].name, image: DATA[id].image});
        //compteur = compteur + 1;
        //setAffichage({name: DATA[id].name, image: DATA[id].icon});
    }



    // const getDetails = () => {
    //     // //fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=restaurant&inputtype=textquery&fields=name,photos&locationbias=circle:2000@45.643894, -73.843219&key=AIzaSyCzrs5G1Aw5jLQ_Oeafyg3G6T68VNT01Rs").then(res => res.json()).then(resp => DATA = resp);
    //     // fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.643894, -73.843219&radius=500&type=restaurant&key=AIzaSyCzrs5G1Aw5jLQ_Oeafyg3G6T68VNT01Rs").then(res => res.json()).then(resp => setDetails(resp));
    //     // console.log("DETAILS GET");

    //     fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.643894,%20-73.843219&radius=500&type=restaurant&key=AIzaSyCzrs5G1Aw5jLQ_Oeafyg3G6T68VNT01Rs").then(res => res.text()).then(resp => setDetails(resp));
    //     console.log(details);

    // }
    
    function setState(){
        if(affichage.length == 0){
            setAffichage({id: DATA[0].id, name: DATA[0].name, image: DATA[0].image});
            //setAffichage({name: details[0].name, image: details[0].icon});
        }
    }
    if(!detailsDone){
<<<<<<< Updated upstream
        PropositionResto();
        //setState();
=======
        //getDetails();
        setState();
>>>>>>> Stashed changes
        setDetailsDone(true);
    }
    return (
        <View style={styles.propoContainer}>
            <Image style={styles.imgResto} source={affichage.image}/>
            <Text style={styles.nomResto}>{affichage.name}</Text>
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