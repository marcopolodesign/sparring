import axios from 'axios';
import {Alert} from 'react-native';
import * as Font from 'expo-font';
import * as LocalAuthentication from 'expo-local-authentication';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';

// const API_BASE_URL = `http://localhost:1337/api`;
const API_BASE_URL = 'https://sea-turtle-app-rkvrr.ondigitalocean.app/api'

// const token ='b403069951b818fd7064c24f35bd70b46bb9457fb2d9d3d3b75a9f49e471ef3f34a13975da1f3a32a738f263bbb45e1daeecea719fa9391af198182f9b51b032a038b6444608a922cac1228aa16bb172329ab0714e35f0ba5a186314087cc9afe5d32dbd8d90ccef6676837ff3ba839bdee91e7a03df4e5d844a2a7412e3ee4c'

const token = 'eec292db44f8aef4b0cf027c225e06edfe4ac63e0c65fc0a8bd4b2c4ec974d681792a4f99cd7de5d8363b317bd453c053e9887df0145f6f02ca0e8ef8610fe714f9752e4e7b8ffcc72329c27ef4ab80bff301d5c378e7f7d2b058abdc743fc543a4652ea140957e669677540dbe02a42672f1378c0efdf2d2c73d2abd958ee5f'

// console.log(API_BASE_URL, 'URL functions.js')

// Create an axios instance with default headers
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export const fetchFonts = async () => {
  const fonts = await Font.loadAsync({
    'Thunder': require('../assets/fonts/Thunder.ttf'),
    'TT Interphases Pro': require('../assets/fonts/TT_Interphases_Pro_Regular.ttf'),
    'TT Interphases Pro Demi Bold': require('../assets/fonts/TT_Interphases_Pro_DemiBold.ttf'),
  });
  return await Promise.all([fonts]);
};



// Example function to fetch a user by ID
export const fetchUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}?populate=*`, {
        });
        return response.data;
    
    } catch (error) {
        alert(`Error fetching user: ${error.message}`, error);
        throw error;
    }
};

// Example function to login
export const loginUser = async (username, password) => {

  // console.log(API_BASE_URL, 'URL USER')
  // console.log(`${API_BASE_URL}/auth/local`, 'URL USER FULL')
    try {
        const response = await axiosInstance.post('/auth/local', {
            identifier: username,
            password: password,
        });
        return response.data;
    } catch (error) {
      console.error('Error logging in:', error.response ? error?.response?.data?.error?.message : error.message);
      throw error;
    }
};


export const createUser = async (userDetails) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/local/register`, userDetails);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };


export const uploadProfilePicture = async (userId, profilePicture) => {
    const formData = new FormData();
    formData.append('files', {
      uri: profilePicture,
      name: `${userId}.jpg'`,
      type: 'image/jpeg',
    });
    formData.append('ref', 'plugin::users-permissions.user'); // The model name (User)
    formData.append('source', 'users-permissions');
    formData.append('refId', userId);
    formData.append('field', 'profilePicture'); // The field name in the model
  
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  };


export const onFaceId = async (user, hasAuth) => {
  try {
    // Checking if device is compatible
    const isCompatible = await LocalAuthentication.hasHardwareAsync();
    
    if (!isCompatible) {
      // alert('Your device isn\'t compatible.')
    }
  
    // Checking if device has biometrics records
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    
    if (!isEnrolled) {
      // alert('No Faces / Fingers found.')
    }
  
    // Authenticate user

    await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Face ID',
      fallbackLabel: 'Use Passcode',
    });
  
    Alert.alert('Utilizar Face ID', 'Deseas utilizar FaceID para ingresar?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confirmar', 
        style: 'confirm',
        isPreferred: true,
        onPress: async () => {
          // dispatch({ type: 'SET_FACE_ID', payload: JSON.stringify(user) });
          await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate with Face ID',
            fallbackLabel: 'Use Passcode',
          });
          
          AsyncStorage.setItem('hasFaceID', JSON.stringify(user));
          AsyncStorage.setItem('hasFaceIDSet', 'true');
          console.log('Uer from onFaceID', user)
        }
      },
    ]);
    

    } catch (error) {
    alert('An error as occured', error?.message);
  }
}

export const logWithFaceId = async (user) => { 
  try {
    console.log(user, 'user from logWithFaceId')
    const isCompatible = await LocalAuthentication.hasHardwareAsync();
    
    if (!isCompatible) {
      alert('Your device isn\'t compatible.')
    }
  
    // Checking if device has biometrics records
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    
    if (!isEnrolled) {
      // alert('No Faces / Fingers found.')
    }

    await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Face ID',
      fallbackLabel: 'Use Passcode',
    });
    const loggedUser = await fetchUser(user.id);
    console.log('User logged in:', loggedUser);

    return true
    // AsyncStorage.setItem('user', JSON.stringify(loggedUser));
    // AsyncStorage.setItem('session', JSON.stringify(loggedUser));
  

  } catch (error) {
    alert(`An error has occured ${error.message}`, error?.message);
  }

}