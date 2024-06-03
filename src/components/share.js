import React from 'react'
import { Colors } from './constants'
import { TouchableOpacity } from 'react-native'

import { Text, ViewJustifyCenter } from './styled-components'

export default function Share() {
  return (
    <ViewJustifyCenter style={{borderRadius: 8, backgroundColor: Colors.primaryGreen, paddingVertical: 17, paddingHorizontal: 15, marginTop: 40}}>
        <Text style={{width: '60%'}} color={Colors.darkGreen} size={'16px'}>Invitá a tus amigos y conectá con ellos en la app!</Text>
        <TouchableOpacity style={{color: Colors.darkGreen, size: 16,  paddingVertical:5, paddingHorizontal: 25, borderWidth: 2, borderColor: Colors.darkGreen, borderRadius: 100 }}>
            <Text style={{color: Colors.darkGreen, fontWeight: 700, fontFamily: 'TT Interphases Pro Demi Bold', fontSize: 18}}>Invitar</Text>
        </TouchableOpacity>
    </ViewJustifyCenter>
  )
}
       