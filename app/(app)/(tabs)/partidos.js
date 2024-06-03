import { useState, useEffect } from 'react';

import {  StyleSheet, View, ScrollView } from 'react-native';
import {Stack} from 'expo-router'

import {Colors} from '../../../src/components/constants.js'
import Container from '../../../Container.js'
import { Heading, Span, SubHeading } from '../../../src/components/styled-components.js';

// icons
import AddMatch from '../../../src/assets/icons/add-match.js'


export default function Partidos({...props}) {

  return (
    <Container bgColor={Colors.darkGreen}>
      <Stack.Screen options={{headerShown: false}} title="Partidos"/>
      <View style={{paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'
      , alignItems: 'center', marginTop: 10}}>
        <View style={{opacity: 0}}>
          <AddMatch />
        </View>
        <Heading textCenter>Partidos</Heading>
      <AddMatch />
      </View>

      <ScrollView>

        <View 
        style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1, marginTop: 20}}>

          <SubHeading textCenter style={{flex: 1}} color={Colors.white}>Explorar Partidos</SubHeading>

          <SubHeading textCenter style={{flex: 1}} color={Colors.white}>Mis Partidos</SubHeading>
        </View>
        <Span style={{flex: 1}}bgColor={Colors.white} />

        

      </ScrollView>
      
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
