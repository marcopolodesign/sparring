import React, { useState, useMemo } from 'react';
import { View, Platform, ImageBackground, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import {Stack, Link, router} from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSharedValue } from 'react-native-reanimated';

import {Colors} from '../../src/components/constants.js'
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import {Input, SubHeading} from '../../src/components/styled-components.js'
import Container from '../../Container.js'
import User from '../../api/test-user.json';
import MainButton from '../../src/components/button.js';
import Icons from '../../src/components/icons.js';
import { loginUser, fetchUser } from '../../api/functions.js';



const Login = () => {
  const [willLogin, setWillLogin] = useState(false);
  const [willSignUp, setWillSignUp] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);
      const {jwt} = data;
      

      const user = await fetchUser(data.user.id)
      // console.log('user fetched:', user)
      // Save JWT to AsyncStorage
      await AsyncStorage.setItem('jwt', jwt);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Dispatch user information to the store
      dispatch({ type: 'SET_USER', payload: user});
      dispatch({ type: 'LOGIN'});
      router.replace('(tabs)')
      
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };



  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView 
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'ios' ? -64 : 0}  
      >

      <Stack.Screen options={{headerShown: false}} title="Home"/>

      <Container safeArea={'test'} bgColor={Colors.darkGreen}>
        
        <ImageBackground source={require('../../src/assets/images/log-in-bg.jpg')} style={{flex: 1, resizeMode: "cover", justifyContent: "flex-end"}}>


        <View style={{paddingBottom: 30, paddingTop: 30, paddingHorizontal: 25, backgroundColor: "#fff", borderTopLeftRadius: 40, borderTopRightRadius: 40}}>

       {willSignUp ? 
              <>
                <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#EDEAEA', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems:'center', marginBottom: 15}}>
                  <Icons icon='Google' color={Colors.darkGreen} />
                  <SubHeading style={{textAlign: 'center', fontWeight: 'bold'}} color={Colors.darkGreen}>Continuar con Google</SubHeading>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingVertical: 15, backgroundColor: '#EDEAEA', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems:'center', marginBottom: 15}}>
                  <Link href='/onboarding' style={{justifyContent: 'space-between', alignItems: 'center', textAlign: 'center'}}>
                  <View style={{marginRight: 10}}>
                   <Icons icon='Email' color={Colors.darkGreen} />
                  </View>
                  <SubHeading style={{textAlign: 'center', fontWeight: 'bold', marginLeft: 30}} color={Colors.darkGreen}>Registrarte con tu mail</SubHeading>
                  </Link>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => {
                  setWillLogin(true)
                  setWillSignUp(false)
                }}
                style={{paddingHorizontal: 20, paddingVertical: 15, borderColor: Colors.darkGreen, borderWidth: 2, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems:'center', marginBottom: 15}}>
                  {/* <Icons icon='Google' color={Colors.darkGreen} /> */}
                  <SubHeading style={{textAlign: 'center', fontWeight: 'bold'}} color={Colors.darkGreen}>Iniciar sesión con tu mail</SubHeading>
                </TouchableOpacity>

              </>
          :   
            <>
              <Input style={{textTransform: 'lowercase', fontFamily: 'TT Interphases Pro Demi Bold'}}placeholder="Username" value={username} onChangeText={setUsername} />
              <Input style={{marginVertical: 10}} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
              <MainButton onPress={handleLogin} willFlex={'none'} ctaText={'Iniciar Sesión'} color={Colors.primaryGreen} bgColor={Colors.darkGreen}/>

              <Link style={{marginTop: 10}} href='/(login)/onboarding'
              >
                <SubHeading color={Colors.textGrey} style={{marginTop: 10, marginBottom: 20, textAlign: 'center'}}size='16px'> 
                 Primera Vez? Registrarse
                </SubHeading>
              </Link>
              </>
           }


        </View>
        </ImageBackground>
      </Container>


    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;