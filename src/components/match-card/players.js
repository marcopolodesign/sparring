import React, {useState} from 'react'
import {View} from 'react-native'
import {Colors} from '../constants'

import PhotoMin from '../photo-min'
import {Text} from '../styled-components'

const Players = ({...props}) => {

  return (
    <>
{props.spots > 2 ? (
  // Case Doubles
  
     <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {console.log(JSON.stringify(props.players[0], 'ESTAS ACA', 2))}
        <View style={{flexDirection: 'row', transform: [{translateX: 10}]}}>
            <PhotoMin sourceImg={props.players[0]?.profilePictureUrl} size={'small'}/>
            {props.players[1] &&
              <PhotoMin sourceImg={props.players[1]?.profilePictureUrl} transform={-20} size={'small'}/>
            }
        </View>
        <Text style={{textAlign: 'center'}} color={Colors.textGrey}>{props.players[0]?.firstName} 
        {props.spots > 2 && ` & ${props.players[1]?.firstName}`}</Text>
    </View>
    ) : (
      // Case Singles
       <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {/* {console.log(props.spots, 'SPOTSSSSS PLAYERS IMG')} */}
        <View style={{flexDirection: 'row', transform: [{translateX: 10}]}}>
            <PhotoMin 
              transform={-10}
            sourceImg={
              props.isOwner ? props.players[0]?.profilePictureUrl  : props.players[1]?.profilePictureUrl }
              size={'small'}
            />
        </View>
        <Text style={{textAlign: 'center'}} color={Colors.textGrey}>
          {props.isOwner ? 'Tú' : props.players[1]?.firstName}
          {/* {props.players[0]?.firstName}  */}
       </Text>
    </View>
    )}
    </>
  )
}

export default Players;