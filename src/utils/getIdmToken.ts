// src/utils/getIdmToken.ts

import axios from 'axios';

const FORGEROCK_TOKEN_ENDPOINT = process.env.FORGEROCK_TOKEN_ENDPOINT || 'https://ciam-sb.mars.com/auth/oauth2/realms/root/realms/Petcare/access_token';

interface TokenResponse {
  access_token: string;
  // Include other fields from the response as needed
}

const CLIENT_ID = process.env.IDM_FORGEROCK_CLIENT_ID || "idm-provisioning"
const CLIENT_SECRET = process.env.IDM_FORGEROCK_CLIENT_SECRET || "openidm"

async function getIdmToken(clientId?: string, clientSecret?: string): Promise<TokenResponse> {
  try {
    const response = await axios.post(FORGEROCK_TOKEN_ENDPOINT, new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId || CLIENT_ID,
      client_secret: clientSecret || CLIENT_SECRET,
      scope: 'fr:idm:*'
    }));

    return response.data;
  } catch (error) {
    console.error('Error obtaining IDM token:', error);
    throw error;
  }
}

export default getIdmToken;
