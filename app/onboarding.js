import { useState, useEffect } from 'react';
import {router} from 'expo-router'

import {  StyleSheet, Text, View, StatusBar, StatusBarIOS } from 'react-native';
import {Stack, Tabs} from 'expo-router'

import {Colors} from '../src/components/constants.js'
import Container from '../Container.js'


import Profile from '../src/screens/Profile.js';
import { Heading, Input } from '../src/components/styled-components.js';
import MainButton from '../src/components/button.js';


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
    router.push({ pathname: 'onboarding-sport', params: userDetails });
  };


  return (
    <Container bgColor={Colors.blue}>
        <Stack.Screen options={{headerShown: false, hrerf: null}} title="Onboarding"/>
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
    </Container>

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
