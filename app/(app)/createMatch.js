import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import {createMatch} from '../../api/functions.js'

import { Colors, Generals } from '../../src/components/constants';
import Container from '../../Container.js';

// Components
import { ViewJustifyCenter, Heading, SubHeading, Button } from '../../src/components/styled-components';
import MatchDateTime from '../../src/components/new-match/date-time.js';
import PhotoMin from '../../src/components/photo-min.js';
import InviteMembers from '../../src/components/new-match/invite-members.js';
import BottomSelect from '../../src/components/BottomSelect.js';
import Loading from '../../src/components/loading.js';

// Icons
import Arrow from '../../src/assets/icons/arrow.js';
import SignUp from '../../src/assets/icons/sign-up.js';
import LocationPin from '../../src/assets/icons/location-pin.js';
import DefaultMapMarker from '../../src/components/defaultMapMarker.js';
import MainButton from '../../src/components/button.js';

const { width, height } = Dimensions.get('screen');

const CreateMatch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const { newMatchSport } = useLocalSearchParams();

  const [chosenSport, setChosenSport] = useState(newMatchSport);


  console.log(chosenSport, 'CHOSEN')
  
  const session = useSelector((state) => state.session);
  const user = JSON.parse(session);
  const mapRef = useRef(null);
  const inviteRef = useRef(null)
  const countryBottomSheetRef = useRef(null);

  const profilePictureUrl = user?.profilePicture.formats.thumbnail.url;

  const [newMatch, setNewMatch] = useState({
    name: newMatchSport,
    Date: '',
    time: '',
    ammount_players: 2,
    price: '',
    description: '',
    location: {
      latitude: '',
      longitude: '',
      address: '',
    }, 
    sport:{
      sport: newMatchSport
    }, 
    match_owner: user.id, 
    members: [user.id]
  });



  useEffect(() => {
    console.log( JSON.stringify(newMatch, null, 2));
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        ...location.coords,
        latitudeDelta: 0.00522,
        longitudeDelta: (width / height) * 0.00522,
      });
      setIsLoading(false);
      console.log(newMatchSport, 'NMS')
    })();

  }, [newMatchSport]);


  setTimeout(() => {
    if (chosenSport === 'select') {
      countryBottomSheetRef.current.expand()
    } }, 2000)

  const succesMessage = {
    title : 'Partido creado con éxito!',
    bgColor : Colors.orange
  }
  


  const handleTypeChange = () => {
    const newType = newMatch.ammount_players === 2 ? 4 : 2;
    setNewMatch({ ...newMatch, ammount_players: newType });
    console.log(newMatch)
  };

  const handlePress = (data, details) => {
    console.log(JSON.stringify(data, null, 2));
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    setLocation({ latitude: lat, longitude: lng });
    console.log(location)
    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setNewMatch({ ...newMatch, location: { latitude: lat, longitude: lng, address: data.description }});

    console.log(data.description.toString())
  };

  const handleMapPress = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    setLocation(coordinate);
    setNewMatch({ ...newMatch, location: { latitude: coordinate.latitude, longitude: coordinate.longitude } });
  };

  const handleCreateMatch = async () => {
    console.log(JSON.stringify(newMatch, null, 2))
    try {
    const response = await createMatch(newMatch);
      console.log('Match created:', response);
      // alert('Success', 'Match created successfully');

      router.push({pathname: '/', params: {succesMessage: 'Partido creado con éxito!', LoadingBgColor: Colors.orange}})
    } catch (error) {
      console.error('Error creating match:', error.message);
      alert('Error', 'Failed to create match');
    }
  };

  if (isLoading) {
    return (
      <Loading LoadingBgColor={"#0F5CCD"}
          title={'Cargando'}
          SubTitle={`Listo para crear un partido de ${newMatch.name}?`}
          loader
      />
    );
  }

  return (
    <>
    <Container hasPadding bgColor={Colors.primaryGreen}>
      <ViewJustifyCenter style={{ justifyContent: 'flex-start', gap: 10, marginBottom: 20 }}>
        <TouchableOpacity style={{ flexDirection: 'row', gap: 15 }} onPress={() => countryBottomSheetRef.current.expand()} >
          <Heading color={Colors.darkGreen}>Nuevo partido de {newMatch?.name}</Heading>
          <View style={{ transform: [{ rotate: '-90deg' }] }}>
            <Arrow />
          </View>
        </TouchableOpacity>
      </ViewJustifyCenter>

      <View style={styles.inputContainer}>
        <ViewJustifyCenter style={{ justifyContent: 'flex-start', gap: 10 }}>
          <TouchableOpacity style={{ flexDirection: 'row', gap: 10 }} onPress={handleTypeChange}>
            <SubHeading size={'16px'} color={Colors.textGrey}>
              {newMatch.ammount_players === 2 ? "Singles" : "Dobles"}
              </SubHeading>
            <View style={{ transform: [{ rotate: '-90deg' }] }}>
              <Arrow />
            </View>
          </TouchableOpacity>
        </ViewJustifyCenter>
        <ViewJustifyCenter>
          <PhotoMin zIndexPosition={2} size={'invite'} sourceImg={profilePictureUrl} />
          <SignUp user={user} newMatch={newMatch} setNewMatch={setNewMatch} players={newMatch.ammount_players} ref={inviteRef}/>
        </ViewJustifyCenter>
      </View>

        <MatchDateTime  
        newMatch={newMatch}
        setNewMatch={setNewMatch}
        />
     
      <View style={[styles.inputContainer, styles.completeContainer, { gap: 10, zIndex: -1, paddingHorizontal: 25}]}>
        <LocationPin color={'#000'} />
        <GooglePlacesAutocomplete
          placeholder='Escribir dirección del partido'
          enablePoweredByContainer={false}
          currentLocationLabel='Usar ubicacion actual'
          enableHighAccuracyLocation
          fetchDetails={true}
          onPress={(data, details = null) => handlePress(data, details)}
          query={{
            key: 'AIzaSyBaSN2_IOj7PtMTMGro1BRc5qfL1NP_P0A',
            language: 'es',
            region: 'AR-C',
            radius: '50',
            types: ['administrative_area_level_2'],
          }}
          styles={{
            container: { paddingVertical: 0,borderRadius: 0, backgroundColor: "#fff" },
            textInput: { paddingHorizontal: 0, paddingVertical: 0, height: 'unset', paddingTop: 5 },
          }}
        />
      </View>

      <MapView
        showsUserLocation={true}
        loadingEnabled={true}
        region={location}
        ref={mapRef}
        style={styles.map}
        initialRegion={location}
        onPress={handleMapPress}
      >
        {location && newMatch.location.address &&
        <Marker draggable coordinate={location}>
            <DefaultMapMarker />
        </Marker>}
      </MapView>
   
      <Button style={{marginTop: 30}} color={'#fff'} bgColor={Colors.blue}  onPress={handleCreateMatch}>
        <SubHeading style={{fontWeight: 'bold'}} color={'#fff'}>Crear partido</SubHeading> 
      </Button>



    </Container>


    <InviteMembers ref={inviteRef} user={user} newMatch={newMatch} setNewMatch={setNewMatch}/>

    <BottomSelect newMatch={newMatch} setChosenSport={setChosenSport} setNewMatch={setNewMatch} selection ref={countryBottomSheetRef} />


    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: Generals.borderRadius,
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  completeContainer : {
    paddingHorizontal: 20,
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: '100%',
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },
  manualInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  datePicker: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
  placeholder: {
    color: '#888',
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: Generals.borderRadius,
    zIndex: -1,
  },
  coordinates: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default CreateMatch;
