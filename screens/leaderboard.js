import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import styles from '../styles';
import LeaderboardItem from '../components/LeaderboardItem';


const leaderboard = ({route, navigation}) => {
    // const {winnerRestoData} = route.params;
    const {allRestoData} = route.params;

    console.log(allRestoData);


    return(
        <View style={styles.formContainer}>
            {/* <FlatList
                    data={}
                    keyExtractor={item => item.salonId}
                    renderItem={({item}) =>
                        <LeaderboardItem salonItem={item} nav={{navigation}} unsubscribe={() => unsubscribe()}/>
                    }
                />             */}
                <Text>a</Text>
        </View>
    );
}

export default leaderboard;
