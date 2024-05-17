import React, { useState, useMemo } from 'react';
import { View, Platform, ImageBackground, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSharedValue } from 'react-native-reanimated';

import {Colors} from '../src/components/constants.js'
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import {Input} from '../src/components/styled-components.js'
import Container from '../Container.js'
import User from '../api/test-user.json';
import MainButton from '../src/components/button.js';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // Replace with your actual login logic
    const token = 'mock-jwt-token'; // Assume this is retrieved from your server
    await AsyncStorage.setItem('jwt', token);
    console.log(token, 'token on login')

    // Dispatch user information
    dispatch({ type: 'SET_USER', payload: User, isAuthenticated: true }); 

};

const logInSheet = React.useRef(null);
const snapPoints = useMemo(() => [.05], []);
const animatedContentHeight = useSharedValue(0)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView 
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'ios' ? -64 : 0}  
      >
    <Container safeArea={'test'} bgColor={Colors.darkGreen}>
      <ImageBackground source={require('../src/assets/images/log-in-bg.jpg')} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}} />
       <BottomSheet
        backgroundStyle={{backgroundColor: "#fff", borderTopLeftRadius: 40, borderTopRightRadius: 40}}
        containerStyle={{flexDirection: 'column', justifyContent: 'center'}} 
        ref={logInSheet}
        snapPoints={snapPoints}
        initialSnapIndex={0}
        shouldMeasureContentHeight={true} 
        index={1}
        handleIndicatorStyle={{ display: "none" }}
        enableDynamicSizing={true}
        contentHeight={animatedContentHeight}
        // backdropComponent={BottomSheetBackdrop}      
        >
          {/* <View style={{paddingVertical : 10}}>
          <View style={{ top: 5}}>
                <Text style={[{ color: "#111" }]}>
                </Text>
            </View>
          </View> */}
           
        <BottomSheetView>
          <View style={{paddingBottom: 50, paddingTop: 30, paddingHorizontal: 20}}>
            <Input placeholder="Username" value={username} onChangeText={setUsername} />
            <Input style={{marginTop: 10, marginBottom: 20}} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <MainButton onPress={handleLogin} ctaText={'Iniciar Sesión'} color={Colors.darkGreen}/>
            </View>

          </BottomSheetView>
        </BottomSheet>
      
    </Container>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
