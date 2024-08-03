import { useState, useEffect } from 'react';

import {  StyleSheet, Text, View, StatusBar, StatusBarIOS } from 'react-native';
import {Stack} from 'expo-router'

import {Colors} from '../../../src/components/constants.js'
import Container from '../../../Container.js'


import Profile from '../../../src/screens/Profile.js';
import MapCard from '../../../src/components/home/MapCard.js';

export default function Map({...props}) {


  return (
    <Container bgColor={Colors.darkGreen}>
      <Stack.Screen options={{headerShown: false}} title="Map"/>
       <MapCard href={'/'} enableScroll={true} screenText="Cerrar Mapa!!!"/>
    </Container>
  );
}