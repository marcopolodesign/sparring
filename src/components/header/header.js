import React, { useContext } from 'react';
import { Link } from 'expo-router';
import { useSelector } from 'react-redux';

import { StyleSheet, Text, View, ImageBackground, Touchable, TouchableOpacity } from 'react-native';
import Logo from '../../assets/icons/logo.js'
import Notification from '../../assets/icons/notification.js';
import profile from '../../assets/images/profile-pic.jpg'

const Header = () => {

  const user = useSelector(state => state.user)
  const backUrl = useSelector(state => state.apiUrl)

  // console.log(user, 'full user')
  // console.log(user.profilePicture.formats.thumbnail.url, 'user profile picture') 

  // console.log(backUrl + user.profilePicture.formats.thumbnail.url, 'full url')

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <Logo />
      <View style={{alignItems: 'center', gap: 20, flexDirection: 'row'}}>
        <Notification />


        <Link href="(home)/profile" asChild>
          <TouchableOpacity onPress={() => {console.log('navigate')}}>
          <ImageBackground source={{uri: backUrl + user.profilePicture.formats.thumbnail.url}} style={{width: 38, height: 38, borderRadius: 100, borderWidth: 2, borderColor: '#fff', overflow: 'hidden'}} 
          onPress={() => {console.log('navigate')}}>
          </ImageBackground>
          </TouchableOpacity>
        </Link>       
      </View>
    </View>
  )
}
export default Header;