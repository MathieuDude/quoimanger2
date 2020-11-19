import React, { useState } from 'react';
import { Alert, Modal, Text, TouchableHighlight, TouchableOpacity, View, Button, TextInput } from 'react-native';
import styles from '../styles';

//Firebase init
import * as firebase from 'firebase';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { FlatList } from 'react-native-gesture-handler';
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

        if(!enteredName)
        {
            setEnteredName("Usager" + Math.floor(Math.random() * 10000));
        }
        
    }

    async function getUsersList(){
        await thisLobby.get().then(function (doc){
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
            return false;
        });
        return true;
        
    }

    function insertName(enteredName){
            var newList = [...usersList, enteredName];
            thisLobby.update({
                users: newList
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            setListener();
    }

    //Rafraichi la liste des users aussitot qu'il y a un changement
    function setListener(){
        thisLobby.onSnapshot(function (doc) {
            var data = doc.data();
            setUsersList(data.users);
        })
    }

    //TODO: apeler cette fonction lorsqu'on quitte la page de nimportequel facon, quandmeme important
    function unsetListener(){
        thisLobby.onSnapshot(function (doc) {})
    }

    if(isLoading){
        getUsersList();
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
                            onPress={() => { checkPass(enteredPass); insertName(enteredName)}}>
                            <Text style={styles.openButtonText}>Entrer!</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            <Text style={styles.textCentered}>Participants: </Text>
            <FlatList
                data={usersList}
                renderItem={({item}) =>
                    <Text style={styles.txtUserlist}>-{item}</Text>
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