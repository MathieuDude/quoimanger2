import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import restoImg from '../Resto.jpg';
import McDoImg from '../McDo.jpg';
import subImg from '../sub.jpg';

const PropositionResto = ({route}) => {
    const [affichage, setAffichage] = useState([]);
    const DATA = [
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
    ];
    function voterOui(){
        var id = affichage.id + 1;
        setAffichage({id: DATA[id].id, name: DATA[id].name, image: DATA[id].image});
    }
    function voterNon(){
        var id = affichage.id + 1;
        setAffichage({id: DATA[id].id, name: DATA[id].name, image: DATA[id].image});
    }
    function setState(){
        console.log(affichage);
        if(affichage.length == 0){
            setAffichage({id: DATA[0].id, name: DATA[0].name, image: DATA[0].image});
        }
    }
    return (
        <View style={styles.propoContainer}>
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