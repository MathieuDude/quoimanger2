import React, {useState} from 'react';
import { Text, TouchableOpacity, TouchableHighlight, View, Modal} from 'react-native';
import styles from '../styles';


const LeaderboardItem = (props) => {
    const leaderboardItem = props.leaderboardItem;
    const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.nomResto}>{leaderboardItem.resto.name}</Text>
                    <Text style={styles.adresseResto}>{leaderboardItem.resto.address}</Text>
                    <TouchableHighlight
                            style={styles.openButtonRouge}
                            onPress={() => { setModalVisible(false); }}>
                            <Text style={styles.openButtonText}>Fermer</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.salonItem}>{leaderboardItem.resto.name} - {leaderboardItem.nbVote} votes</Text> 
            </TouchableOpacity>
        </View>
    );
};

export default LeaderboardItem;