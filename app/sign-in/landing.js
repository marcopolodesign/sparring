import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { router, Link, Stack } from 'expo-router';
import { Keyboard, Text, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, ImageBackground, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../src/components/constants.js';
import { Heading, Input, SubHeading } from '../../src/components/styled-components.js';
import MainButton from '../../src/components/button.js';
import Icons from '../../src/components/icons.js';
import { loginUser, fetchUser, logWithFaceId } from '../../api/functions.js';
import * as LocalAuthentication from 'expo-local-authentication';
import BottomUp from '../../src/components/BottomUp.js'
import * as Haptics from 'expo-haptics';




const  SignIn =  () => { 
  
  const dispatch = useDispatch();
  const [willLogin, setWillLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasFaceId, setHasFaceID] = useState(null)

  const [willSignUp, setWillSignUp] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const sheetRef = useRef(null);

  // Use useSelector at the top level of the component
  const session = useSelector(state => state.session);
  const [isCompatible, setIsCompatible] = useState(false);

  const [bottomUpProps, setBottomUpProps] = useState({
    title: '',
    paragraph: '',
    ctaText: '',
    onPress: () => {},
    loading: false,
  });

  const handleLogin = async () => {
    try {
      setIsUpdating(true);
      const data = await loginUser(username, password);
      const { jwt } = data;
      const user = await fetchUser(data.user.id);

      // Save JWT to AsyncStorage
      await AsyncStorage.setItem('jwt', jwt);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Dispatch user information to the store
      dispatch({ type: 'SET_USER', payload: JSON.stringify(user) });
      dispatch({ type: 'SET_SESSION', payload: JSON.stringify(user) });

      // console.log('Session after login:', JSON.stringify(user));
      setIsUpdating(false);

      router.replace('/');
    } catch (error) {
      sheetRef.current.expand()
      setIsUpdating(false)
      Keyboard.dismiss()
      setBottomUpProps({
        title: 'Ups! Algo salió mal',
        paragraph: `${error.response ? error?.response?.data?.error?.message : error.message}`,
        buttonTitle: 'Reintentar',
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        },
        loading: false,
      });
    //  alert(`Error logging in: ${error.message}`, error);
    }
  };

  const handleLogWithFaceId = async () => {
      try {
      const hasId = await logWithFaceId(hasFaceId)
      const user = await fetchUser(JSON.parse(hasFaceId).id);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Dispatch user information to the store
      dispatch({ type: 'SET_USER', payload: JSON.stringify(user) });
      dispatch({ type: 'SET_SESSION', payload: JSON.stringify(user) });
      router.replace('/');
      }
      catch (error) {
        alert(`An error occured ${error.message}`, error?.message)
      }  
  }


  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setHasFaceID(await AsyncStorage.getItem('hasFaceID'));

      console.log(hasFaceId, 'hasFaceId from init session')
      
      setIsCompatible(compatible);
      setIsLoading(false);
    })()
  })



  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
       <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -24 : 0}
          style={{ flex: 1 }}
            >
        <Stack.Screen options={{ headerShown: false }} title="Sign In"/>
        <View safeArea={'test'} bgColor={Colors.darkGreen} style={{flex: 1, justifyContent: 'flex-end', backgroundColor: Colors.darkGreen}}>
          <ImageBackground source={require('../../src/assets/images/log-in-bg.jpg')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'flex-end' }}>
            <View style={{ paddingBottom: 30, paddingTop: 30, paddingHorizontal: 25, backgroundColor: '#fff', borderTopLeftRadius: 40, borderTopRightRadius: 40, }}>
              {willSignUp ? (
                <>
                    {isCompatible && hasFaceId ? (
                  <TouchableOpacity onPress={ () => handleLogWithFaceId()}

                    style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#EDEAEA', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems: 'center', marginBottom: 15 }}
                  >
                    <Icons icon='Face Id' color={Colors.darkGreen} />
                    <SubHeading style={{ textAlign: 'center', fontWeight: 'bold' }} color={Colors.darkGreen}>
                      Ingresar con Face ID
                    </SubHeading>
                  </TouchableOpacity>
                ) : null}

                  {/* <TouchableOpacity
                    style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#EDEAEA', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems: 'center', marginBottom: 15 }}
                  >
                    <Icons icon='Google' color={Colors.darkGreen} />
                    <SubHeading style={{ textAlign: 'center', fontWeight: 'bold' }} color={Colors.darkGreen}>
                      Continuar con Google
                    </SubHeading>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    style={{ paddingVertical: 15, backgroundColor: '#EDEAEA', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems: 'center', marginBottom: 15 }}
                  >
                    <Link href='/sign-in/onboarding' style={{ justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                      <View style={{ marginRight: 10 }}>
                        <Icons icon='Email' color={Colors.darkGreen} />
                      </View>
                      <SubHeading style={{ textAlign: 'center', fontWeight: 'bold', marginLeft: 30 }} color={Colors.darkGreen}>
                        Registrarte con tu mail
                      </SubHeading>
                    </Link>
                  </TouchableOpacity>

             

                  <TouchableOpacity
                    onPress={() => {
                      setWillLogin(true);
                      setWillSignUp(false);
                    }}
                    style={{ paddingHorizontal: 20, paddingVertical: 15, borderColor: Colors.darkGreen, borderWidth: 2, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems: 'center', marginBottom: 15 }}
                  >
                    <SubHeading style={{ textAlign: 'center', fontWeight: 'bold' }} color={Colors.darkGreen}>
                      Iniciar sesión con tu mail
                    </SubHeading>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                <Heading color={'#000'} style={{ textAlign: 'center', marginBottom: 20 }}>Bienvenido de nuevo!</Heading>
                  <Input style={{ textTransform: 'lowercase', fontFamily: 'TT Interphases Pro Demi Bold', borderColor: Colors.lightGrey, borderWidth: 2 }} placeholder='Username' value={username} onChangeText={setUsername} />
                  <Input style={{ marginTop: 10, marginBottom: 15,borderColor: Colors.lightGrey, borderWidth: 2 }} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
                  <MainButton isLoading={isUpdating} onPress={handleLogin} willFlex={'none'} ctaText={'Iniciar Sesión'} color={Colors.primaryGreen} bgColor={Colors.darkGreen} />

                  <Link style={{ marginVertical: 10 }} href='/sign-in/onboarding'>
                    <SubHeading color={Colors.textGrey} style={{ marginTop: 10, marginBottom: 20, textAlign: 'center' }} size='16px'>
                      Primera Vez? Registrarse
                    </SubHeading>
                  </Link>
                </>
              )}
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    <BottomUp
          {...bottomUpProps}
          sheetRef={sheetRef}
          
          onPress={()=>{
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            sheetRef.current.close();
          }}
        />
    </>
  );
}


export default SignIn;