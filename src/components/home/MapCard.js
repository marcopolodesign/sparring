import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'expo-router'
import MapView, { AnimatedRegion, Animated, Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Image, Text } from 'react-native';
const { height, width } = Dimensions.get('screen');


import profile from '../../assets/images/profile-pic.jpg'

import { StyleSheet, View } from 'react-native';
import {Generals, Colors} from '../constants.js'
import { Heading } from '../styled-components.js';


const MapCard = ({...props}) => {

    const mapviewRef = React.useRef(null);
    const mapStyles = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
      
      const session = useSelector(state => state.session)
      const user = JSON.parse(session)
      const backUrl = useSelector(state => state.backUrl)


    if (!user) {
      return null; // or a loading indicator
    }


    return (
      <View style={[styles.container, {borderRadius: Generals.borderRadius, overflow: 'hidden'}]}>

        <LinearGradient
        // Background Linear Gradient
        locations={[0.5, 1]}
        colors={['#FFF', '#rgba(255, 255, 255, 0.00)']}
        style={{width: '100%', position: 'absolute', zIndex: 1, top: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'start', paddingHorizontal: 25, paddingTop: 35, paddingBottom: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
        >
          <Heading color={Colors.darkGreen}>Explorar Mapa</Heading>
          <Link href={props.href}>
            <Text>Pantalla compelta</Text>
          </Link>
        </LinearGradient>


          <MapView 
          style={{flex: 1, height: 400}}
          // cameraZoomRange={4}
          ref={mapviewRef}
          loadingEnabled
          scrollEnabled={props.enableScroll}
          zoomEnabled={true}
          showsUserLocation = {true}
          showsIndoors={false}
          showsPointsOfInterest={false}
          showsMyLocationButton={false}

          initialRegion={{
            latitude: -34.4407708,
            longitude: -58.7809332,
            latitudeDelta: 0.00922,
            longitudeDelta: (width / height) * 0.00922,
          }}
          // provider = { PROVIDER_GOOGLE }
          // customMapStyle={mapStyles}
          >

          <Marker
            coordinate={{
            latitude: -34.4407708,
            longitude: -58.7809332,
            }}> 
            <View style={styles.circle}>
            <Image
            source={{uri: backUrl + user.profilePicture.formats.thumbnail.url}}
            style={styles.circle}
            />
          </View>
          </Marker>
            </MapView>
      </View>

    )



}

export default MapCard;



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },

  gradient: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
     backgroundImage: 'background: linear-gradient(0deg, rgba(255, 255, 255, 0.00) 16.98%, #FFF 67.92%);'
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 30,
    // backgroundColor: 'red',
    borderWidth: 3,
    borderColor: Colors.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});