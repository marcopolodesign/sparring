import React, {useState} from 'react'
import {View} from 'react-native'
import {Colors} from '../constants'

import PhotoMin from '../photo-min'
import {Text} from '../styled-components'

const Players = ({...props}) => {

  const match = props.matchProp
  
  console.log(match)

  return (
    <>
  {match.ammount_players > 2 ? (
  // Case Doubles
  
     <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {console.log(JSON.stringify(props.players[0], 'ESTAS ACA', 2))}
        <View style={{flexDirection: 'row', transform: [{translateX: 10}]}}>
            <PhotoMin sourceImg={match.members[0]?.profilePictureUrl} size={'small'}/>
            {match.members[1] &&
              <PhotoMin sourceImg={props.players[1]?.profilePictureUrl} transform={-20} size={'small'}/>
            }
        </View>
        <Text style={{textAlign: 'center'}} color={Colors.textGrey}>{props.isOwner ? 'Vos' : match.members[0]?.firstName} 
        {match.member_1 && ` & ${match.members[1]?.firstName}`}</Text>
    </View>
    ) : (
      // Case Singles
       <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', transform: [{translateX: 10}]}}>
            <PhotoMin 
              transform={-10}
              sourceImg={match.members[0]?.profilePictureUrl}
              size={'small'}
            />
        </View>
        <Text style={{textAlign: 'center'}} color={Colors.textGrey}>
          {props.isOwner ? 'Vos' : props.players[0]?.firstName}
          {/* {props.players[0]?.firstName}  */}
       </Text>
    </View>
    )}
    </>
  )
}

export default Players;