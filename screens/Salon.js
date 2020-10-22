import React, { useState } from 'react';
import { Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View, Button, TextInput } from 'react-native';
import styles from '../styles';

const Salon = ({route}) => {
    const {salonId} = route.params;
    const {title} = route.params;
    const {password} = route.params;
    const [modalVisible, setModalVisible] = useState(true);
    const [enteredPass, setEnteredPass] = useState("");





    return(
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
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
                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                    >
                    <Text style={styles.textStyle}>Entrer!</Text>
                    </TouchableHighlight>
                </View>
                </View>
            </Modal>


            <Text>id du salon: {salonId}</Text>
            <Text>mdp du salon: {password}</Text>

        </View>
    );
}

export default Salon;