import React from 'react'
import { router } from 'expo-router';
import { TouchableOpacity, View, Image } from 'react-native';
import { BackArrow } from '../styled-components';
import Arrow from '../../assets/icons/arrow.js';


const PageHeader = () => {
  return (
    <View style={{paddingRight: 20, paddingLeft: 20, zIndex: 3}}>
        {/* <Link href="(tabs)" asChild> */}
            <TouchableOpacity onPress={() => {
              router.back()
              console.log('navigateeee')
              }}>
              <BackArrow>
                  <Arrow />
              </BackArrow>
            </TouchableOpacity>
        {/* </Link> */}
    </View>
  )
}


export default PageHeader;