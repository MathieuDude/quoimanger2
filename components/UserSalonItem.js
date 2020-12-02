import React from 'react';
import { Text, View} from 'react-native';
import styles from '../styles';

const UserSalonItem = (props) => {
    if(props.ready){
        return (
            <View>
                <Text style={styles.textUserListReady}>- {props.text}</Text> 
            </View>
        );
    }
    else {
        return (
            <View>
                <Text style={styles.textUserList}>- {props.text}</Text> 
            </View>
        );
    }
};

export default UserSalonItem;