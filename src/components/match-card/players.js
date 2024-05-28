import React from 'react'
import {View} from 'react-native'
import {Colors} from '../constants'

import PhotoMin from '../photo-min'
import {Text} from '../styled-components'

const Players = ({...props}) => {
  return (

     <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', transform: [{translateX: 10}]}}>
            <PhotoMin sourceImg={props.players[0]?.profilePictureUrl} size={'small'}/>
            <PhotoMin transform={-20} size={'small'}/>
        </View>
        <Text style={{textAlign: 'center'}} color={Colors.textGrey}>{props.players[0]?.firstName} & {props.players[1]?.firstName}</Text>
    </View>
  )
}

export default Players;