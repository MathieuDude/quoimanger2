import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

const Salon = ({route}) => {
    const {salonId} = route.params;
    const {title} = route.params;
    const {password} = route.params;
    return(
        <View style={styles.container}>
            <Text>id du salon: {salonId}</Text>
            <Text>mdp du salon: {password}</Text>
        </View>
    );
}

export default Salon;