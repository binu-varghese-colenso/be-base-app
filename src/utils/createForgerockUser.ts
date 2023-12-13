// src/utils/createForgerockUser.ts

import axios from 'axios';

const FORGEROCK_USER_ENDPOINT = process.env.FORGEROCK_USER_ENDPOINT || 'https://ciam-sb.mars.com/identity/managed/PetcareUser'; // Update with the actual endpoint

type User = {
    userName: string;
    givenName: string;
    sn: string;
    mail: string;
    brandAssociation: string;
    accountId: string;
    preferences: {
        marketing: boolean;
        updates: boolean;
    };
    password: string;
};

async function createForgerockUser(userData: User, token: string) {
  try {
    const response = await axios.post(FORGEROCK_USER_ENDPOINT, userData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept-API-Version': 'protocol=2.1',
            'Content-Type': 'application/json'
          }
    });
    console.log("**User create data***")
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if(error.response.data) {
            console.log(JSON.stringify(error.response.data))
        }
       
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.error('Error creating Forgerock user:', error);
    throw error; 
  }
}

export default createForgerockUser;
