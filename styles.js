import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      paddingTop: 23,
      flex: 1,
    },
    sousTitre: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: '45%',
        backgroundColor: '#FFBF00',
        padding: 10
    },
    item: {
        backgroundColor: '#D3D3D3',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
    },
    salonItem: {
        backgroundColor: '#D3D3D3',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
    },
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
    },
    btnNavCreationSalon: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 50,
        fontSize: 24,
    }
  });

export default styles;