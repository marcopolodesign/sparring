import { useState, useEffect } from 'react';

import {  StyleSheet, View, ScrollView } from 'react-native';
import {Stack} from 'expo-router'

import {Colors} from '../../../../src/components/constants.js'
import Container from '../../../../Container.js'
import { Heading, Span, SubHeading } from '../../../../src/components/styled-components.js';

import NearbyMatches from '../../../../src/components/matchesCarrousel.js'
// icons
import AddMatch from '../../../../src/assets/icons/add-match.js'


export default function Partidos({...props}) {

  return (
    <Container safeArea bgColor={Colors.darkGreen}>
      <Stack.Screen options={{headerShown: true}} title="explorar-partidos"/>
       <NearbyMatches partidosView />      
    </Container>
  );
}

