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
        paddingBottom: 5,
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
        fontSize: 18,
        borderRadius: 15,
        color: '#bdecff',
        shadowColor: "#bdecff",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 10.32,

        elevation: 16,

    },
    buttonGreen: {
        width: '100%',
        backgroundColor: '#66DB24',
        color: '#c4ffc2',
        textAlign: "center",
        padding: 10,
        fontWeight: "bold",
        fontSize: 18,
        borderRadius: 15,
        shadowColor: '#c4ffc2',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 10.32,

        elevation: 16,
    },
    restoPropositionContainer: {
        flex: 1,
        width: '100%',
    },
    buttonVoteGreen: {
        borderWidth: 1,
        borderColor: '#46ff1c',
        alignItems:'center',
        width:90,
        height:90,
        backgroundColor:'#fff',
        borderRadius:20,
        margin: 5,
    },
    buttonVoteRed: {
        borderWidth:1,
        borderColor:'#ff0000',
        alignItems:'center',
        width:90,
        height:90,
        backgroundColor:'#fff',
        borderRadius:20,
        margin: 5
    },
    buttonUser: {
        borderWidth:2,
        borderColor:'black',
        alignItems:'center',
        width:35,
        height:35,
        borderRadius:50,
    },
    buttonUserContainer: {
        position: 'absolute',
        right: '1%',
        width: 50,
        height: 50
    },
    voteContainer: {
        position: "absolute",
        bottom: 0,
        margin: "5%",
        height: 90,
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: "flex-end"
    },
    imgResto: {
        width: '100%',
        height: '65%'
    },
    nomResto: {
        fontWeight: 'bold',
        fontSize: 28,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    adresseResto: {
        fontWeight: 'bold',
        fontSize: 22,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    sousTitre: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#808080'
    },
    salonItem: {
        backgroundColor: '#d6d6d6',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        color: '#292929'
    },
    header:{
        backgroundColor: "#ffffff",
        //backgroundColor:"#42c2f5",
        height: 80,
        marginTop: 30,
        flexDirection: 'row',
        alignItems:'center'
    },
    title:{
        color: "#F3F3F3",
        fontSize: 28,
        fontWeight: '900',
        justifyContent:"center"
    },
    txtInput: {
        marginBottom: 20,
        padding: 6,
        width: 250,
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
        backgroundColor: "#2196F3",
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        width: "90%"
    },
    openButtonVert: {
        backgroundColor: "#66DB24",
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        width: "90%"
    },
    openButtonRouge: {
        backgroundColor: "#f02424",
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        width: "90%"
    },
    openButtonText: {
        paddingLeft: "10%",
        paddingRight: "10%",
        margin: 10,
        textAlign: 'center',
        color: 'white',
    },
    loginModalButtonText:{
        paddingLeft: "25%",
        paddingRight: "25%",
        margin: 5,
        textAlign: 'center',
        color: 'white',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    textCentered: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold"
    },
    textUserList:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8
    },
    textUserListReady:{
        color: "#66DB24",
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    tinyLogo: {
        width: 50,
        height: 50,
        // marginRight: 60,
        // marginLeft:20
    },
  });

export default styles;