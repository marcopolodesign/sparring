import { useState, useEffect } from 'react';

import {  StyleSheet, Text, View, StatusBar, StatusBarIOS } from 'react-native';
import {Stack, Tabs} from 'expo-router'

import {Colors} from '../../../src/components/constants.js'
import Container from '../../../Container.js'


import Profile from '../../../src/screens/Profile.js';


export default function Canchas() {

  return (
    <Container bgColor={Colors.darkGreen}>
 
        <Tabs.Screen options={{headerShown: false, hrerf: null}} title="Canchas"/>
          <Profile bgColor={Colors.darkGreen}/> 
    
    </Container>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
