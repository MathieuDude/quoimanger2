import React from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';

const SalonItem = (props) => {
    const salonItem = props.salonItem;
    return (
        <View>
            <TouchableOpacity>
                <Text style={styles.salonItem}>{salonItem.title}</Text> 
            </TouchableOpacity> 
        </View>
    );
};

export default SalonItem;