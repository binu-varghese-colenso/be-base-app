import axios from 'axios';


const CLIENT_ID = process.env.PEDIGREE_FORGEROCK_CLIENT_ID || "PedigreeGoodpoints"
const CLIENT_SECRET = process.env.PEDIGREE_FORGEROCK_CLIENT_SECRET || "Welcome@123"
const FORGEROCK_TOKEN_ENDPOINT = process.env.FORGEROCK_TOKEN_ENDPOINT || 'https://ciam-sb.mars.com/auth/oauth2/realms/root/realms/Petcare/access_token';

const encodedCredentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const authorizationHeader = `Basic ${encodedCredentials}`;


async function oauthLogin(username, password) {
    try {
        const response = await axios.post(FORGEROCK_TOKEN_ENDPOINT, new URLSearchParams({
            grant_type: 'password',
            scope: 'openid profile',
            username: username,
            password: password
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authorizationHeader
            }
        });

        return response.data; 
    } catch (error) {
        console.error('Error during OAuth login:', error);
        throw error; 
    }
}

export default oauthLogin;
