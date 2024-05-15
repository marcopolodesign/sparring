import React, { useContext } from 'react';
import { Link } from 'expo-router';
import { useSelector } from 'react-redux';

import { StyleSheet, Text, View, ImageBackground, Touchable, TouchableOpacity } from 'react-native';
import Logo from '../../assets/icons/logo.js'
import Notification from '../../assets/icons/notification.js';
import profile from '../../assets/images/profile-pic.jpg'

const Header = () => {

  const user = useSelector(state => state.user)
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50}}>
      <Logo />
      <View style={{alignItems: 'center', gap: 20, flexDirection: 'row'}}>
        <Notification />


        <Link href="/profile" asChild>
          <TouchableOpacity onPress={() => {console.log('navigate')}}>
          <ImageBackground source={profile} style={{width: 38, height: 38, borderRadius: 100, borderWidth: 2, borderColor: '#fff', overflow: 'hidden'}} 
          onPress={() => {console.log('navigate')}}>
          </ImageBackground>
          </TouchableOpacity>
        </Link>       
      </View>
    </View>
  )
}
export default Header;