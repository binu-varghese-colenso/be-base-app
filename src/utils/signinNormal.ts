// src/utils/signInUser.ts

import axios from 'axios';

const FORGEROCK_LOGIN_ENDPOINT = 'https://ciam-sb.mars.com/auth/json/realms/root/realms/Petcare/authenticate?authIndexType=service&authIndexValue=PetcareAuth';

async function signinNormal(username: string, password: string) {
  try {
    const response = await axios.post(FORGEROCK_LOGIN_ENDPOINT, {}, {
      headers: {
        'x-openam-username': username,
        'x-openam-password': password,
        'Accept-API-Version': 'resource=2.0, protocol=1.0'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error during user sign-in:', error);
    throw error; 
  }
}

export default signinNormal;
