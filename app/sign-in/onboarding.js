import { useState, useEffect } from 'react';
import {router} from 'expo-router'

import {  StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard,StatusBar, StatusBarIOS, Platform } from 'react-native';
import {Stack, Tabs} from 'expo-router'

import {Colors} from '../../src/components/constants.js'
import Container from '../../Container.js'


import Profile from '../../src/screens/Profile.js';
import { Heading, Input } from '../../src/components/styled-components.js';
import MainButton from '../../src/components/button.js';


export default function Onboarding() {
  const [firstName, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [email, setMail] = useState('');
  const [address, setAddress] = useState('');



  const handleNext = () => {
    const userDetails = {
      username: firstName+lastName.toLowerCase(),
      firstName,
      lastName,
      age,
      email,
      address,
      confirmed: true,
      password: password,
    };

    // Navigate to the next screen and pass userDetails
    router.push({ pathname: '/sign-in/onboarding-sport', params: userDetails });
  };


  return (
  

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? -44 : 0}
    style={{ flex: 1 }}
      >
      <View style={{backgroundColor: Colors.blue, flex: 1, justifyContent: 'center'}} bgColor={Colors.blue}>
        <StatusBar barStyle="light-content" />
        {/* <Stack.Screen options={{headerShown: true, hrerf: null}} title="Onboarding"/> */}
        <View style={{padding: 20}}>
           <Heading color={'#fff'} style={{marginBottom: 30}}>Bienvenido a la comunidad más grande de jugadores de padel, tenis, y pickleball de Argentina.</Heading>
           <View style={{gap: 15, marginBottom: 30}}>
            <Input placeholder="Nombre" value={firstName} onChangeText={setUsername} />
            <Input placeholder="Apellido" value={lastName} onChangeText={setLastName} />
            <Input secureTextEntry={true} placeholder="Contraseña" value={password} onChangeText={setPassword} />
            <Input placeholder="Edad" value={age} onChangeText={setAge} />
            <Input placeholder="Correo electrónico" value={email} onChangeText={setMail} />
            <Input placeholder="Dirección" value={address} onChangeText={setAddress} />
           </View>

           <MainButton ctaText={"Siguiente"} willFlex={'true'} bgColor={Colors.primaryGreen} color={Colors.blue} onPress={() => handleNext()} />
         </View>
    </View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
 

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
