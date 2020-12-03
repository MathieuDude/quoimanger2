import React, {useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Modal, TextInput, TouchableHighlight, ToastAndroid, Platform, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import * as firebase from 'firebase';
import ApiKeys from '../ApiKeys';

if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}
//initialize DB
const dbh = firebase.firestore();

const Header = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [enteredPass, setEnteredPass] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    
    var tempUserId = getRandomInt(0, 999999999999999999);
    var userIdString = tempUserId.toString();

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function openModal()
    {
        setModalVisible(!modalVisible);
    }
    function getComptesData()
    {
        dbh.collection("comptes").get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    allUsers.push({
                        "userId": doc.get('userId'),
                        "nom": doc.get('nom'),
                        "password": doc.get('password')
                    });
                });
                setIsLoading(false);
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    }
    function checkUsername(nom){
        var isExisting = true;
        
        for(let e of allUsers){
            if(e.nom == nom){
                isExisting = false;
            }
        }
        return isExisting;
    }
    function createAccount(){
        if(enteredName != "" && enteredPass != ""){
            if(checkUsername(enteredName) == true){
                ToastAndroid.show("Compte creer: "+ enteredName, ToastAndroid.SHORT);
                dbh.collection("comptes").doc(userIdString).set({
                    userId: tempUserId,
                    nom: enteredName,
                    password: enteredPass
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
                allUsers.push({
                    "userId": tempUserId,
                    "nom": enteredName,
                    "password": enteredPass
                })
                tempUserId = getRandomInt(0, 999999999999999999);
                userIdString = tempUserId.toString();
            }
            else{
                ToastAndroid.show("comptes deja existant", ToastAndroid.SHORT);
            }
        }
        else{
            ToastAndroid.show("champs vide", ToastAndroid.SHORT);
        }
    }
    function login(){
        dbh.collection("comptes").where("nom", "==", enteredName).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(doc.get('password') == enteredPass){
                    setUsername(doc.get('nom'));
                    window.USERNAME = enteredName;
                    setModalVisible(!modalVisible);
                    ToastAndroid.show("Login", ToastAndroid.SHORT);
                }
                else
                    Alert.alert("Mot de passe incorrecte.");
            });
            
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
    function disconnect(){
        setUsername("");
        window.USERNAME = undefined;
        setModalVisible(!modalVisible);
        ToastAndroid.show("Deconnexion", ToastAndroid.SHORT);
    }
    if(isLoading){
        getComptesData();
        setIsLoading(false);
    }
    return (
            <View style={styles.header}>
                <Image
                    style={{
                        width:(Dimensions.get('window').width/100)*80,
                        height: 80,
                        // marginRight: 60,
                        // marginLeft:20
                      }}
                    source={require('../assets/logo_pizz_title.png')}
                />
                {/* <Text style={styles.title}>{ props.title }</Text> */}
                <View style={styles.buttonUserContainer}>
                    <TouchableOpacity style={styles.buttonUser} onPress={() => openModal()}>
                        <Ionicons name="md-person" size={30} color="black"/>
                    </TouchableOpacity>
                    <Text numberOfLines={2} ellipsizeMode='tail'>{username}</Text>
                </View>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.formLabel}>Nom d'usager :</Text>
                            <TextInput
                                style={styles.txtInput}
                                placeholder={"nom d'usager"}
                                onChangeText={(value) => setEnteredName(value)}
                                value={enteredName}
                            />
                            <Text style={styles.formLabel}>Mot de passe:</Text>
                            <TextInput
                                style={styles.txtInput}
                                secureTextEntry={true}
                                placeholder={"Mot de passe"}
                                onChangeText={(value) => setEnteredPass(value)}
                                value={enteredPass}
                            />
                            <TouchableHighlight
                                style={styles.openButton}
                                onPress={() => {login();}}>
                                <Text style={styles.loginModalButtonText}>      Login      </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.openButtonVert}
                                onPress={() => {createAccount();}}>
                                <Text style={styles.loginModalButtonText}>   Sign up   </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.openButtonRouge}
                                onPress={() => {disconnect();}}>
                                <Text style={styles.loginModalButtonText}>Disconnect</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
    );
}

export default Header;
