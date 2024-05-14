import React from 'react'
import { StyleSheet, Text, View, StatusBar, StatusBarIOS } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';


import {Container} from '../components/styled-components.js'
import {Colors} from '../components/constants.js'
import Header from '../components/header/header.js'

const Home = ({...props}) => {
  const insets = useSafeAreaInsets();

  return (
      <>
        <StatusBar barStyle="light-content" />
        <Header />
        <StatusBar style="auto" />
        </>
  )
}

export default Home;
