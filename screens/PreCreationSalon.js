import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import MapView, {Polygon, Polyline, Marker} from 'react-native-maps';
import styles from '../styles';
import ApiKeys from '../ApiKeys';
import Slider from '@react-native-community/slider';

//NOTES: https://docs.expo.io/versions/v39.0.0/sdk/location/
//https://docs.expo.io/versions/v39.0.0/sdk/permissions/
//https://docs.expo.io/versions/latest/sdk/map-view/


const CreationSalon = ({route, navigation}) => {
  const [sliderValue, setSliderValue] = useState(5);

  const coord1 = {
    "latitude": 45.6422237,
    "longitude": -73.8446587,
    "latitudeDelta": 0.7755658183766698,
    "longitudeDelta": 0.6969268496238357,
  }

  return(
      <View style={styles.formContainer}>
        <MapView  initialRegion={coord1}
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height*0.7
            }}>
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

            
                navigation.navigate('CreationSalon', {searchRadius: sliderValue})

            }}>
            <Text style={styles.buttonBlue}>Passé à la prochaine étape</Text>
        </TouchableOpacity>
      </View>
  );
}

export default CreationSalon;
