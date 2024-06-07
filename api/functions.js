import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale'

import {Alert} from 'react-native';
import * as Font from 'expo-font';
import * as LocalAuthentication from 'expo-local-authentication';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE_URL = 'https://goldfish-app-25h3o.ondigitalocean.app/api'
// PROD TOKEN
const token = '04b4bf677234667eda880a51ef1858959fde491a5a007bf9f00be1060271013bcfbee19c644923e1766f9a77e6cf9d2ac6e57a559bdfec9015425bdcbf89b556b5a971f7d4a6eaf0ce0ea423660fe3793afea05bf8328eb4f3e4fb20d381e6b79e2138fcb1b9000574e72dbe873c1f0698e76a016f19451185c6a4bc43f795fc'

// const API_BASE_URL = `http://localhost:1337/api`;
// const API_BASE_URL = `http://192.168.68.108:1337/api`;

// const token ='b403069951b818fd7064c24f35bd70b46bb9457fb2d9d3d3b75a9f49e471ef3f34a13975da1f3a32a738f263bbb45e1daeecea719fa9391af198182f9b51b032a038b6444608a922cac1228aa16bb172329ab0714e35f0ba5a186314087cc9afe5d32dbd8d90ccef6676837ff3ba839bdee91e7a03df4e5d844a2a7412e3ee4c'



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
          // console.log('Uer from onFaceID', user)
        }
      },
    ]);
    

    } catch (error) {
    alert('An error as occured', error?.message);
  }
}

export const logWithFaceId = async (user) => { 
  try {
    // console.log(user, 'user from logWithFaceId')
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
    // console.log('User logged in:', loggedUser);

    return true
    // AsyncStorage.setItem('user', JSON.stringify(loggedUser));
    // AsyncStorage.setItem('session', JSON.stringify(loggedUser));
  

  } catch (error) {
    alert(`An error has occured ${error.message}`, error?.message);
  }

}

export const getUserFriends = async (user) => {

    const friends = user.friends_added.map(friend => friend.id);
    const friendsReceived = user.friends_received.map(friend => friend.id);
    // console.log(friendsReceived, 'FRIENDS RECEIVED')
    friends.push(...friendsReceived);
    // console.log(friends, 'FRIENDS')
    let friendsEP = '';

    friends.forEach((friend, index) => {
      friendsEP += `filters[id][$in]=${friend}`;
      if (index < friends.length - 1) {
        friendsEP += '&'; // Only add '&' if it's not the last friend
      }
    });

    if (!friendsEP) {
      return [];
    }

    try {
      const response = await axiosInstance.get(`/users?${friendsEP}&populate=*`);
       
      if (response.data && Array.isArray(response.data)) {
        const usersWithThumbnails = response.data.map(user => {
          const thumbnailUrl = user.profilePicture?.formats?.thumbnail?.url || null;
          return {
            ...user,
            thumbnailUrl
          };
        });

    

        return usersWithThumbnails;
      }
    } catch (error) {
      alert(`Error fetching user: ${error.message}`, error);
      throw error;
    }

}

const getUserProfilePicture = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}?populate=profilePicture`);
    return response.data.profilePicture?.formats?.thumbnail?.url || null;
  } catch (error) {
    console.error(`Error fetching profile picture for user ${userId}: ${error.message}`);
    return null;
  }
};

export const getMultipleMatchDetails = async (matchIds) => {
  if (!Array.isArray(matchIds) || matchIds.length === 0) {
    return [];
  }

  // Construct the filter query with $in operator
  const filters = matchIds.map((id, index) => `filters[id][$in][${index}]=${id}`).join('&');
  
  try {
    const response = await axiosInstance.get(`/matches?${filters}&populate=*`);

    // console.log(`/matches?${filters}&populate=members,match_owner,location,sport`)
    const matches = response.data.data;

    // Format the matches
    const formattedMatches = await Promise.all(matches.map(match => formatMatchDetails(match)));
    
    return formattedMatches;
  } catch (error) {
    console.error('Error fetching multiple matches:', error);
    throw error;
  }
};

export const getMatchDetails = async (matchId) => {
  try {
    const response = await axiosInstance.get(`/matches/${matchId}?populate=members,match_owner,location,sport`);
    const match = response.data.data;

    const formattedMatch = await formatMatchDetails(match);

    // console.log(JSON.stringify(formattedMatch, null, 2)); // Pretty-printing the JSON
    return formattedMatch;
  } catch (error) {
    console.error(`Error fetching match: ${error.message}`, error);
    throw error;
  }
};

export const getAllMatches = async () => {
  try {
    const response = await axiosInstance.get(`/matches/?populate=*`);
    const matches = response.data.data;

    // Process each match to include profile picture URLs
    const formattedMatches = await Promise.all(matches.map(formatMatchDetails));

    // console.log(JSON.stringify(formattedMatches, null, 2)); // Pretty-printing the JSON
    return formattedMatches;
  } catch (error) {
    console.error(`Error fetching matches: ${error.message}`, error);
    throw error;
  }
};

const formatMatchDetails = async (match) => {
  const matchDate = parseISO(match.attributes.Date);

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formattedDate = format(matchDate, "EEEE d 'de' MMMM", { locale: es });
  const capitalizedDate = capitalizeFirstLetter(formattedDate);

  // Fetch profile picture URLs for members and match owner
  const matchOwner = match.attributes.match_owner?.data;
  const matchOwnerProfilePictureUrl = matchOwner ? await getUserProfilePicture(matchOwner.id) : null;

  const members = await Promise.all(match.attributes.members.data.map(async (member) => {
    const profilePictureUrl = await getUserProfilePicture(member.id);
    return {
      id: member.id,
      username: member.attributes.username,
      email: member.attributes.email,
      firstName: member.attributes.firstName,
      lastName: member.attributes.lastName,
      profilePictureUrl,
    };
  }));

  return {
    id: match.id,
    date: capitalizedDate, // Capitalized date in Spanish
    time: format(matchDate, 'HH:mm', { locale: es }), // Format time in Spanish
    createdAt: match.attributes.createdAt,
    updatedAt: match.attributes.updatedAt,
    publishedAt: match.attributes.publishedAt,
    description: match.attributes.description,
    location: match.attributes.location,
    sport: match.attributes.sport,
    ammount_players: match.attributes.ammount_players,
    match_owner: matchOwner ? {
      id: matchOwner.id,
      username: matchOwner.attributes.username,
      email: matchOwner.attributes.email,
      firstName: matchOwner.attributes.firstName,
      lastName: matchOwner.attributes.lastName,
      profilePictureUrl: matchOwnerProfilePictureUrl, // Add profile picture URL for match owner
    } : null,
    members,
  };
};

export const getCoaches = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/coaches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coaches:', error);
    throw error;
  }
};


export const fetchCourts = async (courtId) => {
  console.log(`${API_BASE_URL}/courts/?populate=*`)
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/courts/?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching court details:', error);
    throw error;
  }
};

export const fetchCourtDetails = async (courtId) => {
  console.log(`${API_BASE_URL}/courts/${courtId}?populate=*`)
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/courts/${courtId}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching court details:', error);
    throw error;
  }
};

export const createMatch = async (matchData) => {


  console.log(JSON.stringify(matchData, null, 2))
  
  const payload = {
    data: {
      ...matchData,
    }
  };

  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/matches`, payload);
    return response.data;
  } catch (error) {
    console.log(error)
    console.error('Error creating matchHHHHH:', error.data);
    throw error;
  }
};

export const addMemberToMatch = async (matchId, userId) => {
  try {
    console.log(matchId, 'MATCH ID IN ADDMEMBER')
    console.log(userId, 'USER ID IN ADDMEMBER');
    const response = await getMatchDetails(matchId)
      const match = response;
      const members = match?.members || [];
      console.log(JSON.stringify(match, null, 2))
      console.log(members, 'ADD MEMBER TO MATCH MEMBERS')
      const data = {
        match,
        members: [...members, userId],
      };
      return axiosInstance.put(`${API_BASE_URL}/matches/${matchId}`, { data });
    
  } catch (error) {
    console.error('Error adding member to match:', error);
    throw error;
  }

}
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};