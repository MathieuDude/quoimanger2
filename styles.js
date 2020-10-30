import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      paddingTop: 23,
      flex: 1,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 35,
        alignItems: 'center',
    },
    sousTitre: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingTop: 10,
        fontSize: 24,
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
    buttonYellow: {
        width: '100%',
        backgroundColor: '#FFBF00',
        textAlign: "center",
        padding: 10,
        fontWeight: "bold",
        fontSize: 18
    },
    buttonBlue: {
        width: '100%',
        backgroundColor: '#28ADEA',
        textAlign: "center",
        padding: 10,
        fontWeight: "bold",
        fontSize: 18
    },
    buttonVote: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        width:75,
        height:75,
        backgroundColor:'#fff',
        borderRadius:20,
    },
    voteContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        height: 100,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    imgResto: {
        width: '100%',
        height: '70%',
    },
    nomResto: {
        fontWeight: 'bold',
        fontSize: 18,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    sousTitre: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    salonItem: {
        backgroundColor: '#D3D3D3',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        textAlign: "center",
        fontWeight: "bold"
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
    txtInput: {
        marginBottom: 20,
        padding: 6,
        width: "90%",
        fontSize: 24,
        height: 45,
        borderColor: "#C6C6C6",
        borderRadius: 10,
        borderWidth: 4,
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
    },
    formLabel:{
        textAlign: 'center',
        fontSize: 22,
        fontWeight: "bold"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
  });

export default styles;