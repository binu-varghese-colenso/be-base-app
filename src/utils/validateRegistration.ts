// src/utils/validateRegistration.ts

import axios from 'axios';

const VALIDATION_ENDPOINT = process.env.FORGEROCK_VALIDATION_ENDPOINT || 'https://ciam-sb.mars.com/identity/policy/managed/PetcareUser?_action=validateProperty';

interface RegistrationData {
  givenName: string;
  sn: string;
  mail: string;
  brandAssociation: string;
  accountId: string;
  'preferences/marketing'?: boolean;
  'preferences/updates'?: boolean;
}

async function validateRegistration(data: RegistrationData, token: string) {
  try {
    const response = await axios.post(VALIDATION_ENDPOINT, {
      object: data,
      properties: data
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept-API-Version': 'protocol=2.1',
        'Content-Type': 'application/json'
      }
    });

    console.log("*****")
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.error('Error in registration validation:', error);
    throw error;
  }
}

export default validateRegistration;
