import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale'

import {Alert} from 'react-native';
import * as Font from 'expo-font';
import * as LocalAuthentication from 'expo-local-authentication';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Prod
const API_BASE_URL = 'https://goldfish-app-25h3o.ondigitalocean.app/api'
const token = '04b4bf677234667eda880a51ef1858959fde491a5a007bf9f00be1060271013bcfbee19c644923e1766f9a77e6cf9d2ac6e57a559bdfec9015425bdcbf89b556b5a971f7d4a6eaf0ce0ea423660fe3793afea05bf8328eb4f3e4fb20d381e6b79e2138fcb1b9000574e72dbe873c1f0698e76a016f19451185c6a4bc43f795fc'

// const API_BASE_URL = `http://192.168.68.108:1337/api`;
// const API_BASE_URL = `http://localhost:1337/api`;
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

export const getMultipleMatchDetails = async (matchIds, userId) => {
  if (!Array.isArray(matchIds) || matchIds.length === 0) {
    return [];
  }

  // console.log(matchIds, 'MATCHIDS');

  // Construct the filter query with $in operator
  const filters = matchIds.map((id, index) => `filters[id][$in][${index}]=${id}`).join('&');

  
  
  try {
    const response = await axiosInstance.get(`/own-matches?${filters}&populate=*`);

    console.log(`/own-matches?${filters}&populate=*`);

    // Clean up the matches, remove null members
    const cleanedMatches = response.data.map((match) => {
      return {
        ...match,
        members: match.members ? match.members.filter(Boolean) : [], // Filter out null/undefined members
      };
    });

    // Return cleaned matches
    return cleanedMatches;
  } catch (error) {
    console.error('Error fetching multiple matches:', error);
    throw error;
  }
};

export const getMatchDetails = async (matchId) => {
  try {

    // console.log(`/partidos/${matchId}`)
    const response = await axiosInstance.get(`/partidos/${matchId}`);
    const match = response.data;

    // console.log(match, 'MATCH DETAILS!!!!')

    // Format the match and clean the members array
    // const formattedMatch = await formatMatchDetails(match);
    // formattedMatch.members = formattedMatch.members.filter(Boolean); // Filter out null/undefined members

    return match;
  } catch (error) {
    console.error(`Error fetching match: ${error.message}`, error);
    throw error;
  }
};

export const getMatchDetash = async (matchId) => {
  console.log(`/matches/${matchId}?populate=*`)
  try {
    const response = await axiosInstance.get(`/matches/${matchId}?populate=*`);
    const match = response.data;


    // Format the match and clean the members array
    // const formattedMatch = await formatMatchDetails(match);
    // formattedMatch.members = formattedMatch.members.filter(Boolean); // Filter out null/undefined members

    return match;
  } catch (error) {
    console.error(`Error fetching matchhh: ${error.message}`, error);
    throw error;
  }
};

export const getAllMatches = async (userId, ownMatch) => {

  // ownMatch = 1 means true
  try {
    let response; // Declare response outside the blocks

    if (!ownMatch) {
      response = await axiosInstance.get(`/partidos/user/${userId}`);
    } else {
      response = await axiosInstance.get(`/partidos/own-matches/${userId}`);
    }
    const matches = response.data;

    // Clean the members array for each match
    const cleanedMatches = matches.map((match) => {
      return {
        ...match,
        members: match.members ? match.members.filter(Boolean) : [], // Filter out null/undefined members
      };
    });
    console.log(cleanedMatches, 'CLEANED MATCHES')

    return cleanedMatches;
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

  // Helper function to fetch member details
  const fetchMemberDetails = async (member) => {
    if (!member) return null;
    const profilePictureUrl = await getUserProfilePicture(member.id);
    return {
      id: member.id,
      username: member.attributes.username,
      email: member.attributes.email,
      firstName: member.attributes.firstName,
      lastName: member.attributes.lastName,
      profilePictureUrl,
    };
  };

  // Get the individual members if they exist
  const member_1 = match.attributes.member_1 ? await fetchMemberDetails(match.attributes.member_1.data) : null;
  const member_2 = match.attributes.member_2 ? await fetchMemberDetails(match.attributes.member_2.data) : null;
  const member_3 = match.attributes.member_3 ? await fetchMemberDetails(match.attributes.member_3.data) : null;
  const member_4 = match.attributes.member_4 ? await fetchMemberDetails(match.attributes.member_4.data) : null;

  // Dynamically construct the members object, excluding null members
  const members = {};
  if (member_1) members.member_1 = member_1;
  if (member_2) members.member_2 = member_2;
  if (member_3) members.member_3 = member_3;
  if (member_4) members.member_4 = member_4;

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
    members: members, // Only include non-null members
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

export const createMatch = async (matchData, id) => {
  // Ensure match_owner is always member_1
  const matchOwner = id; // Assuming 'user' is the logged-in user

  // Initialize member_1, member_2, member_3, and member_4
  const member_1 = matchOwner;
  // let member_2 = null;
  // let member_3 = null;
  // let member_4 = null;

  // Initialize the members array and include member_1
  const members = [member_1]; 


  // Construct the payload based on the matchData
  const payload = {
    data: {
      ...matchData,
      match_owner:  matchOwner, // Populate match_owner with the logged-in user
      member_1: member_1,      // Explicitly set member_1
      // member_2: member_2,      // Set member_2 as null initially
      // member_3: member_3,      // Set member_3 as null initially if applicable
      // member_4: member_4,      // Set member_4 as null initially if applicable
      members: members, 
      // couples: [],                               // Empty couples initially
      // tournament: { data: [] },                  // Empty tournament array if not part of a tournament
    },
  };

  // Debug log to check the structure of the payload
  console.log(JSON.stringify(payload, null, 2));

  try {
    // POST request to create the match
    const response = await axiosInstance.post(`${API_BASE_URL}/matches`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating match:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addMemberToMatch = async (matchId, userId, playerPos) => {
  try {
    const response = await getMatchDetash(matchId); // Fetch the match details
    const match = response.data;
    console.log(JSON.stringify(match, 2 , ' '))
    let members = match?.attributes.members?.data || null;

    console.log(members, 'MEMBERS ADD MEMBERS')
    
    // Ensure members array has a length of 4 (for member_1 to member_4)
    members = [...members]; // Create a copy of the array

    // Dynamically update member_X field based on playerPos
    const updatedMatch = {
      ...match,
      [`member_${playerPos}`]: userId, // This will set member_2, member_3, or member_4
    };


    console.log(`member_${playerPos}: userId`)
    // Ensure that the members array maintains the correct position
    // If playerPos is 2, the user should appear in index 1, etc.

    members.splice(playerPos - 1, 0, userId); // Insert the user at the correct position
    const data = {
      ...updatedMatch,
      members, // Update the members array with correct positions
    };

    console.log(data.members, 'DATA ADD MEMBS')

    // Perform the PUT request to update the match
    return await axiosInstance.put(`${API_BASE_URL}/matches/${matchId}`, { data });

  } catch (error) {
    console.error('Error adding member to match:', error.message);
    throw error;
  }
};
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};