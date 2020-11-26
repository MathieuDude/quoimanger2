import React, {useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Modal, TextInput, TouchableHighlight, ToastAndroid} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import * as firebase from 'firebase';


const Header = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [enteredPass, setEnteredPass] = useState("");
    const [enteredName, setEnteredName] = useState("");

    var tempUserId = getRandomInt(0, 999999999999999999);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function openModal()
    {
        setModalVisible(!modalVisible);
    }
    function createAccount(){
        /*dbh.collection("comptes").doc(userIdString).set({
          userId: tempUserId,
          nom: nomUser,
          password: motDePasse
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });*/
        ToastAndroid.show("creation compte: "+ tempUserId, ToastAndroid.SHORT);
    }
    function login(){
        //dbh.collection("comptes").get().then()
        ToastAndroid.show("Login", ToastAndroid.SHORT);
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
                <TouchableOpacity style={styles.buttonUser} onPress={() => openModal()}>
                        <Ionicons name="md-person" size={25} color="black"/>
                </TouchableOpacity>
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
                                placeholder={"Mot de passe"}
                                onChangeText={(value) => setEnteredPass(value)}
                                value={enteredPass}
                            />
                            <TouchableHighlight
                                style={styles.openButton}
                                onPress={() => {login();}}>
                                <Text style={styles.openButtonText}>Login</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.openButtonVert}
                                onPress={() => {createAccount();}}>
                                <Text style={styles.openButtonText}>Sign in</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
    );
}

export default Header;
