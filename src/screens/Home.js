import React from 'react'
import { StyleSheet, View, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native';
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
  return (
      <View style={{minHeight: height, paddingLeft: 20, paddingRight: 20}}>
        <StatusBar barStyle="light-content" />
        <Header />
        <StatusBar style="auto" />

        <View>
          <Heading color={"#fff"}>Jugar ahora</Heading>
          <TouchableOpacity onPress={() => sheetRef.current.expand()}>
            <Text color={'#fff'} size={'14px'}>Ver partidos por Zona Norte</Text>
          </TouchableOpacity>
        </View>

          <NearbyMatches />
  
          <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 40, alignItems: 'center', gap: 20, justifyContent: "space-between"}}>
            <MainButton bgColor={Colors.primaryGreen} ctaText={"Crear Partido"} color={Colors.darkGreen} icon={'Add'} />
          </View>
        

        <MapCard />
    
        <BottomUp
          title={'CANCHA RESERVADA CORRECTAMENTE!'}
          paragraph={'PPT Pilar - Cancha 1 • 9:00 — 10:00'}
          buttonTitle={'Invitar amigos a la reserva'}
          sheetRef={sheetRef}
          
          onPress={()=>{
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            sheetRef.current.close();
          }}
          />
        </View>
  )
}

export default Home;

