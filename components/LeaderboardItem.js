import React from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';


const LeaderboardItem = (props) => {
    const leaderboardItem = props.leaderboardItem;
    
    return (
        <View>
            <Text style={styles.salonItem}>{leaderboardItem.resto.name} - {leaderboardItem.nbVote} votes</Text> 
        </View>
    );
};

export default LeaderboardItem;