import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router'; // Adjust this import if necessary
import { Colors } from './constants.js';
import { SubHeading, ThumbImage } from './styled-components.js';
import React, { useState, useEffect } from 'react';

const FriendBubble = ({ MapKey, source, friend, textColor, user, spots, newMatch, setNewMatch, setModalReady, isOwner }) => {
  const backUrl = useSelector(state => state.backUrl);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isSelected, setIsSelected] = useState(null);
  
  const router = useRouter();

if (spots) {
  useEffect(() => {
    // console.log(selectedFriends, 'SELECTED AMIGOS SELECTFRIENDS');
    // console.log(selectedFriends[0])

   
     spots !=2 ? setIsSelected(selectedFriends.includes(friend.id)) : setIsSelected(selectedFriends[0] === friend.id)

     console.log(isSelected)

  }, [selectedFriends, isSelected]);
}

  const handlePress = () => {
    if (spots) {
      const maxSelections = spots === 2 ? 1 : 3;
      console.log(friend.id, 'FRIEND ID FROM V SINGLES');

      if (selectedFriends.includes(friend.id)) {
        // Deselect if already selected
        const updatedFriends = selectedFriends.filter(id => id !== friend.id);
        setSelectedFriends(updatedFriends);
        setNewMatch({ ...newMatch, members: newMatch.members.filter(member => member !== friend.id) });
        setModalReady(false)
      } else {
        if (selectedFriends.length >= maxSelections) {
          if (spots === 2) {
            // Singles match: Deselect the previous friend and select the new one
            const updatedFriends = [friend.id];
            setSelectedFriends(updatedFriends);
            setNewMatch({ ...newMatch, members: [newMatch.members[0], friend.id] }); // Assuming the first member is always present
            setModalReady(true)
          } else {
            // Doubles match: Alert the user
            alert('Maximum member limit reached', 'Please deselect one member before selecting another.');
            setModalReady(false)
          }
        } else {
          // Select the friend if not already selected and under the limit
          const updatedFriends = [...selectedFriends, friend.id];
          setSelectedFriends(updatedFriends);
          setNewMatch({ ...newMatch, members: [...newMatch.members, friend.id] });
          console.log(updatedFriends, 'SELECTED AMIGO');
          setModalReady(true)
        }
      }
    } else {
      // Redirect to the profile of the member
      router.push({
        pathname: '(app)/perfil',
        params: { playerID: user.id },
      });
    }
  };


  return (
    <View key={MapKey} style={styles.container}>
      {/* {console.log(source, 'SOURCEEEEEEE')} */}
      {console.log(isOwner, 'IS OWNER')}
      <TouchableOpacity
        style={[
          styles.touchable,
          isSelected && styles.selectedTouchable, // Apply selected style if the user is selected
        ]}
        onPress={handlePress}
      >
        <ThumbImage style={isSelected && styles.selectedThumb} source={{ uri: backUrl + source }} />
        {friend ? (
          <SubHeading
            size={'16px'}
            style={[styles.subHeading, isSelected && styles.selectedText]}
          > {isOwner ? 'Vos' : 
            `${friend.firstName}\n${friend.lastName}`}
          </SubHeading>
        ) : (
          <SubHeading
            size={'16px'}
            style={[styles.subHeading, { color: textColor || Colors.textGrey }]}
          >
            {isOwner ? 'Vos' : 
            `${user.firstName}\n${user.lastName}`}
          </SubHeading>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  subHeading: {
    marginTop: 5,
    textAlign: 'center',
    color: Colors.textGrey,
  },
  selectedThumb: {
    borderWidth: 2,
    borderColor: Colors.blue,
  },
  selectedTouchable: {
    color: Colors.blue,
  },
  selectedText: {
    color: Colors.blue,
  },
});

export default FriendBubble;
