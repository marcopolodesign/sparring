import React from 'react';
import { View } from 'react-native';
import { Colors } from '../constants';

import PhotoMin from '../photo-min';
import { Text } from '../styled-components';

const Players = ({...props}) => {

  const match = props.matchProp;
  
  // console.log(match);

  const photoSize = props.photoSize || 'small';

  let {member_1, member_2} = props;


  return (
    <>
      {match.ammount_players > 2 ? (
        // Case Doubles
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {/* Si tiene los 2 anotados */}
          {member_1 && member_2 ? (
            <>
              <View style={{flexDirection: 'row', transform: [{translateX: 10}]}}>
                <PhotoMin sourceImg={member_1?.profilePictureUrl} size={photoSize} />
                {match.members[1] && (
                  <PhotoMin
                    sourceImg={member_2?.profilePictureUrl || null}
                    transform={-20}
                    size={'big'}
                  />
                )}
              </View>
              <Text style={{textAlign: 'center'}} color={Colors.textGrey}>
                {props.isOwner ? 'Vos' : member_1?.firstName}
                {member_2 && ` & ${member_2?.firstName}`}
              </Text>
            </>
          ) : (
            // Case where only 1 member is present
            <View style={{flexDirection: 'column'}}>
              <PhotoMin sourceImg={match.members[0]?.profilePictureUrl} size={photoSize} />
              <Text style={{textAlign: 'center'}} color={Colors.textGrey}>
                {props.isOwner ? 'Vos' : match.members[0]?.firstName}
              </Text>
            </View>
          )}
        </View>
      ) : (
        // Case Singles
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', transform: [{translateX: 10}]}}>
            <PhotoMin
              transform={-10}
              sourceImg={member_1?.profilePictureUrl}
              size={photoSize}
            />
          </View>
          <Text style={{textAlign: 'center'}} color={Colors.textGrey}>
            {props.isOwner ? 'Vos' : member_1?.firstName}
          </Text>
        </View>
      )}
    </>
  );
};

export default Players;