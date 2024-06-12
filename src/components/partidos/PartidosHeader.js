import { View, Text } from 'react-native'
import React, {useRef, useState} from 'react'
import AddMatch from '../../assets/icons/add-match.js'
import {Heading} from '../styled-components.js'
import { Colors } from '../constants.js'
import {router} from 'expo-router'

export default function PartidosHeader() {

    const countryBottomSheetRef = useRef(null);

  return (
    <>
  
          <View style={{paddingHorizontal: 20, backgroundColor: Colors.darkGreen, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 125}}>
            <View style={{opacity: 0}}>
              <AddMatch />
            </View>
            <Heading textCenter>Partidos</Heading>
          <AddMatch onPress={()=> { router.push({  params: {newMatchSport: 'select'}, pathname: '(app)/createMatch'})}} />
          </View>
          
    </>
        );
}