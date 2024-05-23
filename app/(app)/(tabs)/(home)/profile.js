import { useState, useEffect } from 'react';

import {  StyleSheet, Text, View, StatusBar, StatusBarIOS } from 'react-native';
import {Stack, Tabs} from 'expo-router'

import {Colors} from '../../../../src/components/constants.js'
import Container from '../../../../Container.js'


import ProfileScreen from '../../../../src/screens/Profile.js';


export default function Profile() {



  return (
    <>
      <Tabs.Screen
      options={{headerShown: false, href:null}}
      title="Profile"
   
      />
       <ProfileScreen bgColor={Colors.primaryGreen}/> 
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
