import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { SubHeading, ThumbImage } from './styled-components.js'
import { Colors, Generals } from './constants.js';
import Icons from './icons.js';
import { getUserFriends, isEmpty } from '../../api/functions.js';
import FriendBubble from './friend-v-single.js';

const Friends =  ({user, backUrl}) => {

    const [friends, setFriends] = useState([]);

    useEffect(() => {
      const fetchFriends = async () => {
        try {
          const friendsData = await getUserFriends(user);
          setFriends(friendsData);
          console.log(friends, 'FRIENDSSSS')
        //   console.log(friends[0].thumbnaillUrl, 'STATE FRIENDS')
        //   console.log(friendsData[0].profilePicture.formats.thumbnail, 'FRIENDS DATA');
        } catch (error) {
          console.error('Error fetching friends:', error);
        }
      };
  
      fetchFriends();
    }, []);


  

    return (
      <>
      {!isEmpty(friends) ? (
        <View style={{ marginVertical: 20, paddingLeft: 20, alignSelf: 'flex-start', justifyContent: 'space-between', flex: 1 }}>
        <SubHeading color={'#000'}>Sparrings de {user.firstName} {user.lastName}</SubHeading>
        <View style={{ gap: 15, width: '100%', marginTop: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
            {friends.map((friend, index) => (
          
              <FriendBubble key={index} friend={friend} source={friend.thumbnailUrl} textColor={Colors.textGrey} />
           
            ))}
        </View>
        </View>
        ) : 
        null
        }
      </>
    )
  
}

export default Friends;