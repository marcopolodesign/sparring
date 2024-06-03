import { Stack } from 'expo-router'
import React from 'react'
import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard,StatusBar, StatusBarIOS, Platform } from 'react-native'
import {Colors} from '../../src/components/constants.js'


export default function SignIn() {
  return (


    <Stack
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: Colors.blue,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        // fontWeight: 'bold',
      },
  
    }}
  >
    <Stack.Screen name="landing"  />
    <Stack.Screen name="onboarding" />
    <Stack.Screen name="onboarding-sport" options={{ headerShown: false }} />
  </Stack>



  )
}
