import { useState, useEffect } from 'react';

import {  StyleSheet, Text, View, StatusBar, StatusBarIOS } from 'react-native';
import {Stack} from 'expo-router'

import {Colors} from '../src/components/constants.js'
import Container from '../Container.js'


import Profile from '../src/screens/Profile.js';


export default function App() {



  return (
    <>
      <Stack.Screen options={{headerShown: false}} title="Profile"/>
       <Profile bgColor={Colors.primaryGreen}/> 
    </>
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
