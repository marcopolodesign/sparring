import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {Stack} from 'expo-router'
import Container from '../../../Container.js'
import { StyleSheet, View, StatusBar, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { onFaceId } from '../../../api/functions.js';
import {Colors} from '../../../src/components/constants.js'
import { Heading, Text } from '../../../src/components/styled-components.js';
const { height } = Dimensions.get('screen');

import NearbyMatches from '../../../src/components/matchesCarrousel.js'
import NearbyCoaches from '../../../src/components/coachesCarrousel.js'


import * as Haptics from 'expo-haptics';

import Header from '../../../src/components/header/header.js'
import BottomUp from '../../../src/components/BottomUp.js'
import MainButton from '../../../src/components/button.js';
import MapCard from '../../../src/components/home/MapCard.js';
import Share from '../../../src/components/share.js';
import AsyncStorage from '@react-native-async-storage/async-storage';



// import Home from '../Home.js';

 const App =  ({...props}) => {

  const session = useSelector(state => state.session);
  const user = JSON.parse(session);
  const backUrl = useSelector(state => state.backUrl);
  const [hasFaceIDActive, setHasFaceIDActive] = useState(null)


  const sheetRef = useRef(null);

  const [bottomUpProps, setBottomUpProps] = useState({
    title: '',
    paragraph: '',
    ctaText: '',
    onPress: () => {},
    loading: false,
  });

  useEffect(() => {
    async function checkFaceId() {
      const faceIDStatus = await AsyncStorage.getItem('hasFaceIDSet');
      setHasFaceIDActive(faceIDStatus);
      console.log('hasFaceIDActive', faceIDStatus); // This will log the correct value

      if (faceIDStatus !== 'true') {
        onFaceId(user);
      }
    }

    checkFaceId();
  }, [user, onFaceId]);



  return (
    <Container bgColor={Colors.darkGreen}>
      <Stack.Screen options={{headerShown: false}} title="Home"/>
        <>
        <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
        <StatusBar barStyle="light-content" />
        <Header user={user} backUrl={backUrl} />
        <StatusBar style="auto" />
    </View>
      <ScrollView style={{minHeight: height, paddingHorizontal: 20, paddingTop: 30, flex: 1, paddingBottom: 100}}>
        
        <View>
          <Heading color={"#fff"}>Jugar ahora</Heading>
          <TouchableOpacity onPress={() => {
            sheetRef.current.expand()
            setBottomUpProps({
              title: 'CANCHA RESERVADA CORRECTAMENTE!',
              paragraph: 'PPT Pilar - Cancha 1 • 9:00 — 10:00',
              buttonTitle: 'Invitar amigos a la reserva',
              onPress: () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              },
              loading: false,
            });
            }}>
            <Text color={'#fff'} size={'14px'}>Ver partidos por Zona Norte</Text>
          </TouchableOpacity>
        </View>

          <NearbyMatches />
  
          <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 40, alignItems: 'center', gap: 20, justifyContent: "space-between"}}>
            <MainButton
              onPress={() => {
                sheetRef.current.expand()
                setBottomUpProps({
                  title: 'Proximamente disponible!!!!',
                  paragraph: 'Estás con ganas de jugar?',
                  buttonTitle: 'Anotate a la beta!',
                  onPress: () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    console.log('presssssin')
                    loading: true
                  },
                  loading: false,
                });
              }}
            bgColor={Colors.primaryGreen} ctaText={"Crear Partido"} color={Colors.darkGreen} icon={'Add'} />
          </View>
        
          <MapCard user={user} href={'partidos'} enableScroll={false}/>


        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "flex-end", marginTop: 40}}>
          <Heading color={"#fff"}>Buscar Profesores</Heading>
          <TouchableOpacity onPress={() => {
            sheetRef.current.expand()
            setBottomUpProps({
              title: 'CANCHA RESERVADA CORRECTAMENTE!',
              paragraph: 'PPT Pilar - Cancha 1 • 9:00 — 10:00',
              buttonTitle: 'Invitar amigos a la reserva',
              onPress: () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              },
              loading: false,
            });
            }}>
            <Text color={'#fff'}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <NearbyCoaches />

        <Share />


       <View style={{marginBottom: 250}}></View>
    
  
      
        </ScrollView>

         
        <BottomUp
          {...bottomUpProps}
          sheetRef={sheetRef}
          
          onPress={()=>{
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            sheetRef.current.close();
          }}
        />
        </>
     </Container>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// {isCompatible ? (
//   <TouchableOpacity onPress={() => {onFaceId()}}
//     style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#EDEAEA', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems: 'center', marginBottom: 15 }}
//   >
//     <Icons icon='Face Id' color={Colors.darkGreen} />
//     <SubHeading style={{ textAlign: 'center', fontWeight: 'bold' }} color={Colors.darkGreen}>
//       Ingresar con Face ID
//     </SubHeading>
//   </TouchableOpacity>
// ) : null}