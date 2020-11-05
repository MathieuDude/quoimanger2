import React, { useState } from 'react';
import { Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View, Button, TextInput } from 'react-native';
import styles from '../styles';

const Salon = ({route, navigation}) => {
    const {salonId} = route.params;
    const {title} = route.params;
    const {password} = route.params;
    
    const [modalVisible, setModalVisible] = useState(true);
    const [enteredPass, setEnteredPass] = useState("");
    const [enteredName, setEnteredName] = useState("");


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
                        <Text style={styles.formLabel}>Mot de passe:</Text>
                        <TextInput
                        style={styles.txtInput}
                        onChangeText={(enteredPass) => setEnteredPass(enteredPass)}
                        value={enteredPass}
                        />
                        <Text style={styles.formLabel}>Nom d'usager (optionnel):</Text>
                        <TextInput
                        style={styles.txtInput}
                        onChangeText={(enteredName) => setEnteredName(enteredName)}
                        value={enteredName}
                        />
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {   
                            checkPass(enteredPass);
                        }}
                        >
                        <Text style={styles.textStyle}>Entrer!</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>


            <Text>id du salon: {salonId}</Text>
            <Text>titre du salon: {title}</Text>
            <Text>mdp du salon: {password}</Text>
            <Text>Nom d'usager: {enteredName}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                navigation.navigate('PropositionResto', {salonID: salonId})
            }}>
                <Text style={styles.buttonBlue}>Voir les restos</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Salon;