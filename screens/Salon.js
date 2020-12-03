import React, { useRef, useState } from 'react';
import { Alert, Modal, Text, TouchableHighlight, TouchableOpacity, View, Button, TextInput, BackHandler } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import UserSalonItem from '../components/UserSalonItem';
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

    const thisLobby = dbh.collection("lobbies").doc(salonId.toString());
    var unsubscribe = thisLobby.onSnapshot(function (doc) {})
    
    const [modalVisible, setModalVisible] = useState(true);
    const [enteredPass, setEnteredPass] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [usersList, _setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [readyToVote, setReadyToVote] = useState(false);

    const usersListRef = useRef(usersList);
    const setUsersList = data => {
        usersListRef.current = data;
        _setUsersList(data);
    }

    function checkPass(inputedPass) {
        if(inputedPass != password && password != "") {
            Alert.alert("Mot de passe incorrecte.");
        }
        else { 
            setModalVisible(!modalVisible); 
            insertUserLobby(enteredName);
        }
    }

    function getLobbyUsers() {
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
            console.error(error);
        });
    }

    function insertUserLobby() {
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

    function removeUserFromLobby(refUsersList) {
        if(usersList != undefined){
            var tempList = [...refUsersList];
            var index = tempList.findIndex(user => user.username === enteredName);
            tempList.splice(index, 1);

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
    function setDBListener(){
        unsubscribe = thisLobby.onSnapshot(function (doc) {
            var data = doc.data();
            var tempUsers = [];
            for(var user of data.users){
                tempUsers.push(user);
            }
            setUsersList(tempUsers);
            checkLobbyReadyStatus(usersListRef.current);
        });
    }
    
    //Les eventListeners pour enlever l'usager qui quitte le lobby
    function setLeaveListeners(){
        navigation.setOptions({
            headerLeft: () => <HeaderBackButton onPress={() => { leaveLobby(); }}/>
        });
        BackHandler.addEventListener("hardwareBackPress", leaveLobby);
    }

    function unsetLeaveListeners(){
        BackHandler.removeEventListener("hardwareBackPress", () => {return true;});
    }

    function leaveLobby(){
        unsubscribe();
        unsetLeaveListeners();
        removeUserFromLobby(usersListRef.current);
        navigation.popToTop();
        return true;
    }

    function toggleReady(){
        if(usersList != undefined){
            if(readyToVote){
                //unready?
            }
            else {
                setReadyToVote(true);
                var tempList = [...usersList];
                tempList.forEach(function (user){
                    if(user.username == enteredName){
                        user.isReady = true;
                    }
                });

                thisLobby.update({
                    users: tempList
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }
        }
    }

    function checkLobbyReadyStatus(refUsersList){
        let readyCount = 0;
        refUsersList.forEach(user => {
            if(user.isReady){
                readyCount++;
            }
        });

        //se déplacer vers Propo resto
        if(readyCount >= refUsersList.length && refUsersList.length > 0){
            thisLobby.update({
                isJoinable: false
            })
            unsubscribe();
            unsetLeaveListeners();
            navigation.navigate('PropositionResto', {salonID: salonId, participants: refUsersList.length});
        }
    }

    //Initialisation de la page
    if(isLoading){
        getLobbyUsers();
        setDBListener();
        setLeaveListeners();
        if(window.USERNAME != ""){
            setEnteredName(window.USERNAME);
        }
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
                    unsubscribe();
                    unsetLeaveListeners();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.formLabel}>Nom d'usager :</Text>
                        <TextInput
                            style={styles.txtInput}
                            placeholder={"(optionnel)"}
                            onChangeText={(value) => setEnteredName(value)}
                            value={enteredName}
                        />
                        <Text style={styles.formLabel}>Mot de passe du salon:</Text>
                        <TextInput
                            style={styles.txtInput}
                            secureTextEntry={true}
                            onChangeText={(value) => setEnteredPass(value)}
                            value={enteredPass}
                        />
                        <TouchableHighlight
                            style={styles.openButton}
                            onPress={() => { checkPass(enteredPass); }}>
                            <Text style={styles.openButtonText}>Entrer!</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            <Text style={styles.textCentered}>Participants: </Text>
            <FlatList
                data={usersList}
                renderItem={({item}) =>
                    <UserSalonItem text={item.username} ready={item.isReady}/>
                }
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {toggleReady();}}>
                <Text style={styles.buttonGreen}>Prêt à voter</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Salon;