import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { Link, router } from 'expo-router';
// import { getAllMatches } from '../../../api/functions';
import MapMarker from '../../../src/components/mapMarker';
import { Generals, Colors } from '../constants';
import { Heading } from '../styled-components';

const { height, width } = Dimensions.get('screen');

const MapCard = ({ ...props }) => {
  const session = useSelector((state) => state.session);
  const user = JSON.parse(session);
  const backUrl = useSelector((state) => state.backUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [zoomedMarkers, setZoomedMarkers] = useState([]);
  const mapviewRef = useRef(null);

  // const LoadMatches = async () => {
  //   try {
  //     const match = await getAllMatches();
  //     setMatches(match);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching match:', error.message);
  //   }
  // };

useEffect(() => {
    // LoadMatches();
    setIsLoading(false);
  }, []);

  
  if (isLoading) {
    return null; // or a loading indicator
  }


  return (
    <View style={[styles.container, { borderRadius: Generals.borderRadius, overflow: 'hidden' }]}>
      <LinearGradient
        // Background Linear Gradient
        locations={[0.5, 1]}
        colors={['#FFF', 'rgba(255, 255, 255, 0.00)']}
        style={{
          width: '100%',
          position: 'absolute',
          zIndex: 1,
          top: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'start',
          paddingHorizontal: 25,
          paddingTop: 35,
          paddingBottom: 80,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Heading color={Colors.darkGreen}>Explorar Mapa</Heading>
        <Link href={props.href}>
          <Text>{props.screenText ? props.screenText : 'Pantalla completa'}</Text>
        </Link>
      </LinearGradient>

      <MapView
        style={{ flex: 1, height: 400 }}
        ref={mapviewRef}
        loadingEnabled
        scrollEnabled={props.enableScroll}
        zoomEnabled={true}
        showsUserLocation={true}
        showsIndoors={false}
        showsPointsOfInterest={false}
        showsMyLocationButton={false}
        initialRegion={{
          latitude: -34.4407708,
          longitude: -58.7809332,
          latitudeDelta: 0.00922,
          longitudeDelta: (width / height) * 0.00922,
        }}
        // onRegionChangeComplete={handleRegionChangeComplete}
      >

        {/* {matches.map((match) => {
          return (
            <Marker
              key={match.id}
              coordinate={{
                latitude: match.location.latitude,
                longitude: match.location.longitude,
              }}
              onPress={() => {
                // router.push({
                //   pathname: '(app)/partido',
                //   params: { idMatch: match.id },
                // });
              }}
            >
              <MapMarker uri={match.match_owner?.profilePictureUrl} title={match.match_owner} id={match.id} />
            </Marker>
        )
        })
        } */}

        <Marker
          coordinate={{
            latitude: -34.4407708,
            longitude: -58.7809332,
          }}
        >
          <View style={styles.circle}>
            <Image
              source={{ uri: backUrl + user.profilePicture.formats.thumbnail.url }}
              style={styles.circle}
            />
          </View>
        </Marker>
      </MapView>
    </View>
  );
};

export default MapCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  clusterMarker: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: Colors.darkGreen,
    borderWidth: 3,
    borderColor: Colors.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clusterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
