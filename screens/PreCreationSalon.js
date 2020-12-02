import React, { useState, useRef, useEffect } from 'react';
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
    const [isLoading, setIsLoading] = useState(0);
    // const mapRef = useRef(null);

    useEffect(() => {
        if(isLoading < 10)
        {
            _getLocation();
        }
    });

    
    const coord1 = {
        "latitude": 45.6422237,
        "longitude": -73.8446587,
        "latitudeDelta": 1,
        "longitudeDelta": 1,
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
        setIsLoading(isLoading+1);
    };
    

    return(
        <View style={styles.formContainer}>
            <MapView  
                initialRegion={coord1}
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height*0.70,
                    marginTop: 20
                }}
                showsMyLocationButton={true}   
                showsUserLocation={true}
                showsCompass={false}
                onPress={e => setCircleLocation(e.nativeEvent.coordinate)}
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
                {/* <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                        _getLocation();
                    }}>
                    <Text style={styles.buttonGreen}>GPS</Text>
                </TouchableOpacity> */}
            
        </View>
    );
}

export default CreationSalon;
