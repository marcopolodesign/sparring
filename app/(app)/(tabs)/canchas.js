import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { Stack } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Colors, Generals } from '../../../src/components/constants.js';
import * as Location from 'expo-location';
import Container from '../../../Container.js';
import { fetchCourts } from '../../../api/functions.js';
import { Heading, SubHeading, Span, BorderView, ViewJustifyCenter } from '../../../src/components/styled-components.js';
import FilterButton from '../../../src/components/filterButton.js';
import MapMarker from '../../../src/components/mapMarker.js';
import LocationPin from '../../../src/assets/icons/location-pin.js';
import SearchIcon from '../../../src/assets/icons/search.js'
import HistoryIcon from '../../../src/assets/icons/history.js'
import MapIcon from '../../../src/assets/icons/map-icon.js'
import Loading from '../../../src/components/loading.js';

const { width, height } = Dimensions.get('screen');

const CourtScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courts, setCourts] = useState([]);
  const [location, setLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isMapActive, setIsMapActive] = useState(false);
  const sheetRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchCourtData = async () => {
      try {
        const data = await fetchCourts();
        setCourts(data);
        console.log('Courts:', JSON.stringify(data, null, 2));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching court details:', error);
      }
    };

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location)
    })();

    fetchCourtData();
  }, []);

  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      0.5 - Math.cos(dLat) / 2 + 
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      (1 - Math.cos(dLon)) / 2;
  
    return R * 2 * Math.asin(Math.sqrt(a));
  };

  const handleSheetChanges = (index) => {
    setIsMapActive(index === 0);
  };

  const handleMarkerPress = (latitude, longitude) => {
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const bottomSheetHandle = () => (
    <TouchableOpacity 
      onPress={() => { sheetRef.current.snapToIndex(1) }}
      style={{ height: 70, backgroundColor: '#F9F9F9', borderColor: '#A8A8A8', borderWidth: 1, borderTopLeftRadius: Generals.modalBorderRadius, borderTopRightRadius: Generals.modalBorderRadius, justifyContent: 'center', alignItems: 'center' }}>
      <SubHeading size={'16px'} color={Colors.darkGreen} style={{ fontWeight: 'bold' }}>Ver listado de {courts.length} sedes</SubHeading>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <>
      <Loading LoadingBgColor={Colors.darkGreen || "#0F5CCD"}
      title={'Buscando canchas'}
      SubTitle={'Mostrando más de 423 canchas'}
      loader
      />
      <Stack.Screen options={{ headerShown: false }} title="Canchas" />
      </>
    );
  }

  return (
    <>
    

    <Container safeArea bgColor={Colors.darkGreen}>
      <Stack.Screen options={{ headerShown: false }} title="Canchas" />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <View style={styles.searchContainer}>
            <SearchIcon />
            <TextInput style={styles.searchBox} placeholder="Pilar, Buenos Aires" placeholderTextColor={Colors.textGrey} />
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity><HistoryIcon /></TouchableOpacity>
            {/* <TouchableOpacity><Text>🔖</Text></TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.filters}>
          <FilterButton name="Ver todos" bgColor={Colors.primaryGreen} size="14px" color={Colors.darkGreen} />
          <FilterButton name="Paddle" bgColor={Colors.primaryGreen} size="14px" color={Colors.darkGreen} />
          <FilterButton name="Hoy - todo el día" bgColor={Colors.primaryGreen} size="14px" color={Colors.darkGreen} />
        </View>
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[150, height]}
        backgroundStyle={{borderTopLeftRadius: Generals.modalBorderRadius, borderTopRightRadius: Generals.modalBorderRadius}}
        handleComponent={bottomSheetHandle}
        backdropComponent={BottomSheetBackdrop}
        onChange={handleSheetChanges}
      >
        <BottomSheetScrollView style={{ flex: 1, paddingTop: 150, borderTopRadius: Generals.modalBorderRadius }}>
          {courts.map((item, index) => {
            // const distance = haversine(
            //   location.coords.latitude,
            //   location.coords.longitude,
            //   item.attributes.location.latitude,
            //   item.attributes.location.longitude
            // ).toFixed(0);
            const courtCover = item.attributes.cover?.data?.attributes?.formats?.medium?.url;

            return (
              <TouchableOpacity key={index}
              onPress={() => { router.push({  pathname: '/cancha', 
              params: {courtId: item.id} }) }}>
              <ImageBackground key={index} source={{ uri: courtCover }} style={styles.courtImage}>
                <View style={styles.courtDetails}>
                  <Heading>{item.attributes.name}</Heading>
              
                  <View style={styles.courtInfo}>
                    <ViewJustifyCenter style={{flexDirection: 'row', gap: 5}}>
                      <LocationPin color={"#fff"} />
                      <SubHeading size={'14px'}>{item.attributes.location.city}</SubHeading>
                    </ViewJustifyCenter>
                    {/* <SubHeading color={"#fff"} style={styles.courtDistance}>{distance}km</SubHeading> */}
                    <Text style={styles.courtRating}>★ 3.2{item.attributes.rating}</Text>
                    {/* <Text style={styles.courtPrice}>$4.500{item.attributes.price}</Text> */}
                  </View>
                </View>
              </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </BottomSheetScrollView>
      </BottomSheet>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: courts[0]?.attributes.location.latitude || 0,
          longitude: courts[0]?.attributes.location.longitude || 0,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
       {courts.map((court) => (
        <>

            <Marker
              key={court.id}
              coordinate={{
                latitude: court.attributes.location.latitude,
                longitude: court.attributes.location.longitude,
              }}
              onPress={() => {
                setSelectedMarker(court.id);
                handleMarkerPress(court.attributes.location.latitude, court.attributes.location.longitude)
              }}
            >
              <MapMarker
                uri={court.attributes.cover?.data?.attributes?.formats?.medium?.url}
                title={court.attributes.name}
                id={court.id}
                isSelected={selectedMarker === court.id}
              />
            </Marker>
            </>
          ))}
      </MapView>
      {!isMapActive && 
        <TouchableOpacity style={styles.fixedButton} onPress={ () => {
          sheetRef.current.snapToIndex(0);
          setIsMapActive(true)
        }
        }>
          <MapIcon color={Colors.darkGreen}/>
          <SubHeading size={'16px'} style={{fontWeight: 'bold'}}color={Colors.darkGreen}>Ver mapa</SubHeading>
      </TouchableOpacity>
      }
    </Container>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.darkGreen,
    padding: 20,
    paddingTop: 80,
    zIndex: 5,
    gap: 5
  },
  searchContainer: {
    padding: 15,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 100,
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10
  },
  searchBox: {
    backgroundColor: Colors.white,
    fontFamily: 'TT Interphases Pro',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryGreen,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
  },
  filters: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 10,
  },
  filterButton: {
    backgroundColor: Colors.primaryGreen,
    padding: 5,
    borderRadius: 100,
  },
  courtImage: {
    width: width - 20,
    height: 200,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  courtDetails: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    flex: 1,
    justifyContent: 'flex-end'
  },
  courtName: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  courtAddress: {
    color: Colors.white,
    fontSize: 14,
  },
  courtInfo: {
    flexDirection: 'row',
    gap: 30, 
    alignItems: 'center',
  },
  courtDistance: {
    color: Colors.white,
    fontSize: 14,
  },
  courtRating: {
    color: Colors.white,
    fontSize: 14,
  },
  courtPrice: {
    color: Colors.white,
    fontSize: 14,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: Colors.blue,
    borderWidth: 2,
  },
  fixedButton: {
    position: 'absolute',
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 5,
    bottom: 100,
    right: width / 2 - 60,
    backgroundColor: Colors.primaryGreen,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    zIndex: 100
  },
});

export default CourtScreen;
