import React, { useEffect, useState } from 'react';
import { Alert, Modal, Text, TouchableHighlight, TouchableOpacity, View, Button, TextInput, BackHandler } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import styles from '../styles';

//Firebase init
import * as firebase from 'firebase';
//import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { FlatList } from 'react-native-gesture-handler';
//import { unstable_renderSubtreeIntoContainer } from 'react-dom';
//import { NavigationActions } from 'react-navigation';
const dbh = firebase.firestore();
if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}

const Salon = ({route, navigation}) => {
    const {salonId} = route.params;
    const {title} = route.params;
    const {password} = route.params;

    const  thisLobby = dbh.collection("lobbies").doc(salonId.toString());
    
    const [modalVisible, setModalVisible] = useState(true);
    const [enteredPass, setEnteredPass] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function checkPass(inputedPass)
    {
        if(inputedPass != password)
        {
            Alert.alert("Mot de passe incorrecte.");
        }
        else{ setModalVisible(!modalVisible); }
    }

    function getUsersList(){
        thisLobby.get().then(function (doc){
            if(doc.exists){
                var data = doc.data();
                var tempUsers = [];
                for(var user of data.users){
                    tempUsers.push(user);
                }
                setUsersList(tempUsers);
            }
        }).catch((error) =>{
            console.log(error);
        });
    }

    function insertUser(){
        //vérifications anti-useState
        var tempUser = {};
        var tempList = [];

        if(!enteredName){
            tempUser['username'] = generateName();
            setEnteredName(tempUser['username']);
        }
        else {
            tempUser['username'] = enteredName;
        }

        tempUser['isReady'] = false;

        if(usersList != undefined){
            tempList = [...usersList, tempUser];
        }
        else {
            tempList = [tempUser];
        }

        //DB interaction
        thisLobby.update({
            users: tempList
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    function removeUser() {
        if(usersList != undefined){
            var tempList = [...usersList];
            var index = tempList.findIndex(user => user.username === enteredName);
            tempList.splice(index, 1);
            console.log(tempList);

            thisLobby.update({
                users: tempList
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
    }

    function generateName(){
        return "Usager" + Math.floor(Math.random() * 10000);
    }

    //Rafraichi la liste des users aussitot qu'il y a un changement
    function setListener(){
        thisLobby.onSnapshot(function (doc) {
            var data = doc.data();
            var tempUsers = [];
            for(var user of data.users){
                tempUsers.push(user);
            }
            setUsersList(tempUsers);
            checkLobbyReadyStatus(data.users);
        })
    }
    
    //ATTENTION: appeler cette methode nimporte ou ailleurs brise la patente (pourquoi? cherpas, demande a react, tk je pert du temps en osti avec des niaiseries dmeme)
    navigation.setOptions({
        headerLeft: () => <HeaderBackButton onPress={() => { unsetListener(); removeUser(); navigation.popToTop();} }/>
    });
    BackHandler.addEventListener("hardwareBackPress", () => { unsetListener(); removeUser(); navigation.popToTop(); return true;})

    function unsetListener(){
        thisLobby.onSnapshot(function (doc) {})
    }

    function checkLobbyReadyStatus(users){
        //TODO: check si tlm est ready, naviger vers proposition resto, blocker l'entrée au salon, envoyer le nb de gens en params
    }

    //Initialisation de la page
    if(isLoading){
        getUsersList();
        setListener();
        setIsLoading(false);
    }

    return(
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    navigation.goBack();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.formLabel}>Nom d'usager (optionnel):</Text>
                        <TextInput
                            style={styles.txtInput}
                            onChangeText={(value) => setEnteredName(value)}
                            value={enteredName}
                        />
                        <Text style={styles.formLabel}>Mot de passe du salon:</Text>
                        <TextInput
                            style={styles.txtInput}
                            onChangeText={(value) => setEnteredPass(value)}
                            value={enteredPass}
                        />
                        <TouchableHighlight
                            style={styles.openButton}
                            onPress={() => { checkPass(enteredPass); insertUser(enteredName);}}>
                            <Text style={styles.openButtonText}>Entrer!</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            <Text style={styles.textCentered}>Participants: </Text>
            <FlatList
                data={usersList}
                renderItem={({item}) =>
                    <Text style={styles.textUserlist}>- {item.username}</Text>
                }
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                navigation.navigate('PropositionResto', {salonID: salonId})}}>
                <Text style={styles.buttonBlue}>Voir les restos</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Salon;