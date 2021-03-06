import React from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';

//Reminder des routes/params:
//navigation.navigate('nomDePage', {param1: paramData, paramX: paramData})
//Dans "Salon": on le recoit simplement avec Salon = ({route}) => ...
//Dans "App.js": les params sont défini d'avance pour savoir quoi lui passer
const SalonItem = (props) => {
    const salonItem = props.salonItem;
    const nav = props.nav;
    
    if(salonItem.isJoinable){
        return (
            <View>
                <TouchableOpacity onPress={() => {
                        props.unsubscribe(); //TODO,bien faire appeler le unsubscribe (besoin de ComponentDidUnmount dans Home.js??)
                        nav.navigation.navigate('Salon', {salonId: salonItem.salonId, title: salonItem.title, password: salonItem.password});
                    }}>
                    <Text style={styles.salonItem}>{salonItem.title}</Text> 
                </TouchableOpacity> 
            </View>
        );
    }
    else {
        return null;
    }
};

export default SalonItem;