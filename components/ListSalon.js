import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

const ListSalon = (props) => {
    const salonItem = props.salonItem;
    return (
        <View style={StyleSheet.listSalon}>
            <Text>{salonItem.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    todoItem: {
        width: '100%',
        height: 40,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingTop: 5
    }
});

export default ListSalon;