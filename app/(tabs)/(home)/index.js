import { useState, useEffect } from 'react';

import {  StyleSheet, Text, View, StatusBar, StatusBarIOS } from 'react-native';
import {Stack} from 'expo-router'

import {Colors} from '../../../src/components/constants.js'
import Container from '../../../Container.js'


import Home from '../../../src/screens/Home.js';


export default function App() {



  return (
    <Container bgColor={Colors.darkGreen}>
      <Stack.Screen options={{headerShown: false}} title="Home"/>
       <Home bgColor={Colors.darkGreen}/> 
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
