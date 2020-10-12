import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import styles from '../styles';

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{ props.title }</Text>
        </View>
    );
}

export default Header;
