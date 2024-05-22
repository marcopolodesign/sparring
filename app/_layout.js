import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStore } from 'redux';
import { useSelector, Provider, useDispatch } from 'react-redux';

import Coach from '../api/test-coach.json';

// const IP = '192.168.68.109';
const IP = 'localhost';
const backUrl = `http://${IP}:1337`;

const initialState = {
  user: null,
  counter: 0,
  coach: null,
  isAuthenticated: false,
  apiUrl: backUrl,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return { ...state, counter: state.counter + 1 };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'SET_COACH':
      return { ...state, coach: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'CHANGE_BACK_URL':
      return { ...state, apiUrl: action.payload };
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
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          console.log('user from asyncstorage', user);
          dispatch({ type: 'SET_USER', payload: JSON.parse(user) });
          dispatch({ type: 'SET_COACH', payload: Coach });
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Text style={{ color: '#000' }}>Loading...</Text>
      </View>
    );
  } else {

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {isAuthenticated ? (
          <>
            {console.log('User is authenticated!!!')}
            <Stack screenOptions={{ animation: 'fade', animationDuration: 250 }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </>
        ) : (
          <>
            {console.log('User is NOTTTT authenticated!!!')}
          <Stack>
            <Stack.Screen options={{headerShow: false}} name="(login)" />
          </Stack>
          </>
        )}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
};

const _layout = (props) => (
  <Provider store={store}>
    <App {...props} />
  </Provider>
);

export default _layout;
