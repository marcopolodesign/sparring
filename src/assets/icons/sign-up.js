import { View, Text } from 'react-native'
import React from 'react'
import {Colors} from '../../components/constants.js'

export default function SignUp({...props}) {

  console.log(props.players, 'Players' )
  return (
    <>
    {props.players === 4 ? 
    <View style={{width: 35, height: 35, borderWidth: 1, borderColor: Colors.blue, borderRadius: 100, borderStyle: 'dashed', justifyContent: 'center', alignItems: "center"}}>
        <View style={{width: 35, height: 35, borderWidth: 1, borderColor: Colors.blue, borderRadius: 100, borderStyle: 'dashed', justifyContent: 'center', alignItems: "center", transform: [{translateX: -20,}], backgroundColor: '#fff', zIndex: 3}}>
            <Text size={'20px'} color={Colors.blue}>+</Text>
        </View>
    </View>
    : 
        <View style={{width: 40, height: 40, borderWidth: 1, borderColor: Colors.blue, borderRadius: 100, borderStyle: 'dashed', justifyContent: 'center', alignItems: "center", transform: [{translateX: -15,}], backgroundColor: '#fff'}}>
            <Text size={'20px'} color={Colors.blue}>+</Text>
        </View>
    }
    </>
  )
}