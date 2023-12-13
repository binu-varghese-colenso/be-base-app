// src/utils/decodeIdToken.ts

import axios from 'axios';

const FORGEROCK_TOKENINFO_ENDPOINT = process.env.FORGEROCK_TOKENINFO_ENDPOINT || 'https://ciam-sb.mars.com/auth/oauth2/realms/root/realms/Petcare/idtokeninfo';
const CLIENT_ID = process.env.PEDIGREE_FORGEROCK_CLIENT_ID || "PedigreeGoodpoints"
const CLIENT_SECRET = process.env.PEDIGREE_FORGEROCK_CLIENT_SECRET || "Welcome@123"

async function decodeIdToken(idToken: string): Promise<any> {
    try {
        const response = await axios.post(FORGEROCK_TOKENINFO_ENDPOINT, new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            id_token: idToken
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error decoding ID token:', error);
        throw error;
    }
}

export default decodeIdToken;
