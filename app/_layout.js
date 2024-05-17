import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStore } from 'redux';
import { useSelector, Provider, useDispatch } from 'react-redux';

import Home from '../src/screens/Home.js';
import User from '../api/test-user.json';
import Coach from '../api/test-coach.json';
import Login from '../app/log-in.js';

const initialState = { user: null, counter: 0, coach: null, isAuthenticated: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return { ...state, counter: state.counter + 1 };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'SET_COACH':
      return { ...state, coach: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, coach: null, isAuthenticated: false };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = ({ children, ...props }) => {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('jwt');
      console.log(token)
      if (token) {
        // Assuming you have a method to verify the token and fetch user data
        dispatch({ type: 'SET_USER', payload: User }); // Replace with actual user data fetching logic
        dispatch({ type: 'SET_COACH', payload: Coach }); // Replace with actual coach data fetching logic
        console.log('User is authenticated');
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {isAuthenticated ? (
          <Stack screenOptions={{ animation: 'fade', animationDuration: 250 }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        ) : (
            
          <Login />
        )}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const _layout = (props) => (
  <Provider store={store}>
    <App {...props} />
  </Provider>
);

export default _layout;
