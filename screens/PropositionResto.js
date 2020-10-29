import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import restoImg from '../Resto.jpg';
import McDoImg from '../McDo.jpg';
import subImg from '../sub.jpg';

const PropositionResto = ({route}) => {
    var compteur = 0;
    const [affichage, setAffichage] = useState([]);
    /*const DATA1 = [
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
    ];*/
    const [details, setDetails] = useState([])
    const getDetails = () => {
        //fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=restaurant&inputtype=textquery&fields=name,photos&locationbias=circle:2000@45.643894, -73.843219&key=AIzaSyCzrs5G1Aw5jLQ_Oeafyg3G6T68VNT01Rs").then(res => res.json()).then(resp => DATA = resp);
        fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.643894, -73.843219&radius=2000&type=restaurant&key=AIzaSyCzrs5G1Aw5jLQ_Oeafyg3G6T68VNT01Rs").then(res => res.json()).then(resp => setDetails(resp));
      }
    function voterOui(){
        //var id = affichage.id + 1;
        //setAffichage({id: DATA[id].id, name: DATA[id].name, image: DATA[id].image});
        compteur = compteur + 1;
        setAffichage({name: details[compteur].name, image: details[compteur].icon});
    }
    function voterNon(){
        //var id = affichage.id + 1;
        //setAffichage({id: DATA[id].id, name: DATA[id].name, image: DATA[id].icon});
    }
    function setState(){
        console.log("DETAILS");
        console.log(details);
        if(affichage.length == 0){
            //setAffichage({id: DATA[0].id, name: DATA[0].name, image: DATA[0].icon});
            setAffichage({name: details[0].name, image: details[0].icon});
        }
    }
    return (
        <View style={styles.propoContainer}>
            {getDetails()}
            {setState()}
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