import { useState, useEffect } from 'react';
import { createStore } from 'redux';
import { useSelector, Provider } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, StatusBarIOS } from 'react-native';

import {Colors} from './src/components/constants.js'
import User from './api/test.json'

import Home from './src/screens/Home.js';


export default function App() {
  const initialState = {user: null, counter: 0};

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_COUNTER':
        return { ...state, counter: state.counter + 1 };
      case 'SET_USER':
        return { ...state, user: action.payload };
      default:
        return state;
    }
  };
  const store = createStore(reducer);



  useEffect(() => {
    store.dispatch({ type: 'SET_USER', payload: User });
    // console.log(store.getState());
  }
  ,[]);

  return (
    <Provider store={store}>
    <SafeAreaView style={{ backgroundColor: Colors.darkGreen }}>
      <StatusBar barStyle="light-content" />
      <Home />
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
