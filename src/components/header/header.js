import React, {useEffect} from 'react';
import { Link } from 'expo-router';
import { useSession } from '../../../api/ctx';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import Logo from '../../assets/icons/logo.js';
import Notification from '../../assets/icons/notification.js';
import { useSelector } from 'react-redux';

const Header = () => {
  const session = useSelector(state => state.session);
  const user = JSON.parse(session);
  const backUrl = useSelector(state => state.backUrl);

// console.log(user['id'])
  
  // Check if user.profilePicture and its nested properties exist
  const profilePictureUrl = user.profilePicture.formats.thumbnail.url;

  // console.log('Profile Picture URL:', profilePictureUrl);

  if (!profilePictureUrl) {
    console.error('Profile picture URL is undefined');
    return null; // or return a placeholder image or spinner
  }

  const fullProfilePictureUrl = backUrl + profilePictureUrl;
  console.log('Full Profile Picture URL:', fullProfilePictureUrl);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Logo />
      <View style={{ alignItems: 'center', gap: 20, flexDirection: 'row' }}>
        <Notification />
        <Link href="(home)/profile" asChild>
          <TouchableOpacity onPress={() => { console.log('navigate'); }}>
            <ImageBackground 
              source={{ uri: fullProfilePictureUrl }} 
              style={{ width: 38, height: 38, borderRadius: 100, borderWidth: 2, borderColor: '#fff', overflow: 'hidden' }} 
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Header;
