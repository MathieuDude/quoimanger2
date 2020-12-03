import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, Alert, FlatList } from 'react-native';
import styles from '../styles';
import LeaderboardItem from '../components/LeaderboardItem';


const leaderboard = ({route, navigation}) => {
    const {salonID} = route.params;
    const {allRestoData} = route.params;

    console.log(allRestoData);


    return(
        <View style={styles.formContainer}>
            <FlatList
                    data={allRestoData}
                    keyExtractor={item => item.salonId}
                    renderItem={({item}) =>
                        <LeaderboardItem salonItem={item} nav={{navigation}}/>
                    }
                />            
                <Text>a</Text>
        </View>
    );
}

export default leaderboard;
