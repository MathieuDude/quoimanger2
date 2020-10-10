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

/*const styles = StyleSheet.create({
    header:{
        backgroundColor: "#171717",
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },

    title:{
        color: "#F3F3F3",
        fontSize: 28,
        fontWeight: '900',
    }
});*/

export default Header;
