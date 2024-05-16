import React, {useState, useEffect} from 'react'
import { StyleSheet, View, StatusBar, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import {Colors} from '../components/constants.js'
import { Heading, Text } from '../components/styled-components.js';
import { FlashList } from "@shopify/flash-list";
const { height } = Dimensions.get('screen');

import NearbyMatches from '../components/matchesCarrousel.js'

import * as Haptics from 'expo-haptics';

import Header from '../components/header/header.js'
import BottomUp from '../components/BottomUp.js'
import MainButton from '../components/button.js';
import MapCard from '../components/home/MapCard.js';



const Home = ({...props}) => {
  const sheetRef = React.useRef(null);

  const [bottomUpProps, setBottomUpProps] = useState({
    title: '',
    paragraph: '',
    ctaText: '',
    onPress: () => {},
    loading: false,
  });


  useEffect(() => {
    console.log(bottomUpProps)
  })

  return (
    <>
    <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
        <StatusBar barStyle="light-content" />
        <Header />
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
        

        <MapCard href={'map'} enableScroll={false}/>

        <View style={{marginTop: 40}}>
          <Heading color={"#fff"}>Jugar ahoraaa</Heading>
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
          }
          
         

          }>
            <Text color={'#fff'} size={'14px'}>Ver partidos por Zona Norte</Text>
          </TouchableOpacity>
        </View>

          <NearbyMatches />
  
          <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 250, alignItems: 'center', gap: 20, justifyContent: "space-between"}}>
            <MainButton bgColor={Colors.primaryGreen} ctaText={"Crear Partido"} color={Colors.darkGreen} icon={'Add'} />
          </View>
        </ScrollView>

         
        <BottomUp
          {...bottomUpProps}
          sheetRef={sheetRef}
          
          // onPress={()=>{
          //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          //   // sheetRef.current.close();
          // }}
        />
        </>
  )
}

export default Home;

