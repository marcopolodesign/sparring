import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Stack } from "expo-router";
import * as Font from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { createStore } from 'redux';
import { useSelector, Provider } from 'react-redux';

import { Colors } from '../src/components/constants.js';

import Home from '../src/screens/Home.js';
import User from '../api/test-user.json';
import Coach from '../api/test-coach.json';
import { useFonts } from 'expo-font';



export const _layout = ({ children, ...props }) => {
  
  
  const insets = useSafeAreaInsets();
  const initialState = { user: null, counter: 0, coach: null };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_COUNTER':
        return { ...state, counter: state.counter + 1 };
      case 'SET_USER':
        return { ...state, user: action.payload };
      case 'SET_COACH':
        return { ...state, coach: action.payload };
      default:
        return state;
    }
  };
  const store = createStore(reducer);



  useEffect(() => {
    store.dispatch({ type: 'SET_USER', payload: User });
    store.dispatch({ type: 'SET_COACH', payload: Coach });
  }
  ,[]);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <Provider store={store}>
     <Stack screenOptions={{animation:'fade', animationDuration: 250}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
    </Provider>
    </GestureHandlerRootView>
  );
};

export default _layout;