import { useState, useEffect } from 'react';

import {  StyleSheet, View, ScrollView } from 'react-native';
import {Stack} from 'expo-router'

import {Colors} from '../../../../src/components/constants.js'
import Container from '../../../../Container.js'
// import { Heading, Span, SubHeading } from '../../../../src/components/styled-components';
import NearbyMatches from '../../../../src/components/matchesCarrousel.js'
import OwnMatches from '../../../../src/components/ownMatches.js';


export default function Partidos({...props}) {

  return (
    <Container bgColor={Colors.darkGreen}>
      <Stack.Screen options={{headerShown: false}} title="mis-partidos"/>
      <OwnMatches partidosView />   
    </Container>
  );
}
