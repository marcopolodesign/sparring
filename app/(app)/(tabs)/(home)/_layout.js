import { Stack } from 'expo-router'
import React from 'react'
import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard,StatusBar, StatusBarIOS, Platform } from 'react-native'
import {Colors} from '../../../../src/components/constants.js'


export default function Home() {
  return (


    <Stack
    screenOptions={{
        headerShown: false,
      headerStyle: {
        backgroundColor: Colors.darkGreen,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        // fontWeight: 'bold',
      },
  
    }}
  >
    {/* <Stack.Screen name="index" options={{ headerShown: false}} /> */}
    {/* <Stack.Screen name="profile" /> */}
    {/* <Stack.Screen name="onboarding-sport" options={{ headerShown: false }} /> */}
  </Stack>



  )
}
