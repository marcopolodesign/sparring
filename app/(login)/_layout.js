import { Stack } from 'expo-router'
import React from 'react'


export default function Login() {
  return (

    <Stack
    screenOptions={{
      animationDuration: 250,
      headerShown: false,
    }}
  >
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    <Stack.Screen name="onboarding-sport" options={{ headerShown: false }} />
  </Stack>

  )
}
