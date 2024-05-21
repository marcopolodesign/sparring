import axios from 'axios';

// const API_BASE_URL = 'http://localhost:1337/api';


const IP = '192.168.68.109';
// const backUrl = 'http://localhost:1337';
const API_BASE_URL = `http://${IP}:1337/api`;

const token ='58b4f9b4afa1d92431de203407891f20eacf0fbdb7a42a3bf989186404b4d9b47fd5fa11a0a0f7e6a9535e0d70e4b38d6a91e3c7d5133388c6f8ff1b9a10d207693a4bfe58a7790d95a4e1a6464fe13cfcf0c68b53bca6f8da6a6e4d2abe6032370143e94137e4f1b71dcb2c06af3d94dc2dd43be8ea8b333f0a223c6f46376e'


// Create an axios instance with default headers
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

// Example function to fetch a user by ID
export const fetchUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}?populate=*`, {
        });
        return response.data;
    
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// Example function to login
export const loginUser = async (username, password) => {

  console.log(API_BASE_URL, 'URL USER')
  console.log(`${API_BASE_URL}/auth/local`, 'URL USER FULL')
    try {
        const response = await axiosInstance.post('/auth/local', {
            identifier: username,
            password: password,
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
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