import React, { useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import MapView, {Circle, Polygon, Polyline, Marker} from 'react-native-maps';
import styles from '../styles';
import ApiKeys from '../ApiKeys';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';



//NOTES: https://docs.expo.io/versions/v39.0.0/sdk/location/
//https://docs.expo.io/versions/v39.0.0/sdk/permissions/
//https://docs.expo.io/versions/latest/sdk/map-view/


const CreationSalon = ({route, navigation}) => {
    const [sliderValue, setSliderValue] = useState(5);
    const [userLocation, setUserLocation] = useState({});
    const [circleLocation, setCircleLocation] = useState({"latitude": 45.6422237,"longitude": -73.8446587});
    const mapRef = useRef(null);

    
    const coord1 = {
        "latitude": 45.6422237,
        "longitude": -73.8446587,
        "latitudeDelta": 0.7755658183766698,
        "longitudeDelta": 0.6969268496238357,
    };

    const _getLocation = async () => {
        var { status } = {};
        if(status != 'granted')
        {
            status = await Permissions.askAsync(Permissions.LOCATION);
        }
        const userLoc = Location.getCurrentPositionAsync();
       
        setUserLocation(userLoc);
        console.log(userLocation);
        // mapRef.animateCamera({center: {userLoc.},pitch: 2, heading: 20,altitude: 200, zoom: 40},duration)
        //STEPS: CREATE NEW ASYNC FUNCTION CALLED BY BUTTON: THIS FUNCTION WAITS FOR userLocation, when userLocation is populated it animates the camera to the desired region
        //https://stackoverflow.com/questions/56766390/react-native-maps-how-to-use-animatecamera-and-setcamera
        //https://getstream.io/blog/javascript-promises-and-why-async-await-wins-the-battle/#how-do-i-start-using-async-await
        //https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
        //https://reactjs.org/docs/refs-and-the-dom.html
    };

    return(
        <View style={styles.formContainer}>
            <MapView  
                initialRegion={coord1}
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height*0.6
                }}
                showsMyLocationButton={false}   
                showsUserLocation={true}
                showsCompass={false}
                onPress={e => setCircleLocation(e.nativeEvent.coordinate)}
                ref={mapRef}
            >
                <Circle
                    center={circleLocation}
                    radius={sliderValue*1000}
                    fillColor={"rgba(40, 173, 234,0.5)"}
                />
            </MapView>
            <Text style={styles.formLabel}>Rayon de recherche: </Text>
            <Slider
                style={{width: 300, height: 40}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#28ADEA"
                onValueChange={(value) => setSliderValue(value)}
                value={5}
                step={0.5}
                minimumValue={0.5}
                maximumValue={20}
            />

                <Text>Rayon de recherche: {sliderValue}km</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                        navigation.navigate('CreationSalon', {searchRadius: sliderValue, searchCoords: circleLocation})
                    }}>
                    <Text style={styles.buttonBlue}>Passez à la prochaine étape</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                        _getLocation();
                    }}>
                    <Text style={styles.buttonGreen}>GPS</Text>
                </TouchableOpacity>
            
        </View>
    );
}

export default CreationSalon;
