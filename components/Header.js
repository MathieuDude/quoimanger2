import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

const Header = (props, {navigation}) => {
    return (
            <View style={styles.header}>
                <Image
                    style={{
                        width:(Dimensions.get('window').width/100)*80,
                        height: 80,
                        // marginRight: 60,
                        // marginLeft:20
                      }}
                    source={require('../assets/logo_pizz_title.png')}
                />
                {/* <Text style={styles.title}>{ props.title }</Text> */}
                <TouchableOpacity style={styles.buttonUser}>
                        <Ionicons name="md-person" size={25} color="black"/>
                </TouchableOpacity>
            </View>
    );
}

export default Header;
