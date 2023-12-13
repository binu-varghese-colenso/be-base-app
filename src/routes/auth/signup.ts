// src/routes/auth/signup.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import getIdmToken from '../../utils/getIdmToken';
import validateRegistration from '../../utils/validateRegistration';
import createForgerockUser from '../../utils/createForgerockUser';

interface SignupRequestBody {
  givenName: string;
  sn: string;
  mail: string;
  password: string
  marketing: boolean
}

/*

The signup route in our application now includes enhanced error handling and sequential API calls to ensure robust user registration. The process involves the following steps:

1. Obtaining an IDM Token: The route first retrieves a token from Forgerock's IDM service. If this step fails, an error is returned.

2. Validating Registration Data: Next, the user's registration data is validated against Forgerock's policy. If validation fails, details of the policy requirements that were not met are returned in the error response.

3.Creating the User: Finally, the route attempts to create a new user in Forgerock. Successful user creation is confirmed by the presence of a user id in the response. If this step fails, an appropriate error is returned.
*/

export default async function signupRoute(
  fastify: FastifyInstance,
): Promise<void> {
  fastify.post(
    '/signup',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        // Step 1: Get IDM Token
        const tokenResponse = await getIdmToken();
        const token = tokenResponse.access_token;
        if (!tokenResponse.access_token) {
          return reply.code(401).send({ error: 'Failed to obtain token' });
        }

        // Step 2: Validate Sign-Up Form Data
        // Assert the type of request.body
        const userData = request.body as SignupRequestBody;
        const validationResponse = await validateRegistration(
          {
            givenName: userData.givenName,
            sn: userData.sn,
            mail: userData.mail,
            brandAssociation: process.env.BRAND_ASSOCIATION || 'PedigreeGoodpoints',
            accountId: process.env.ACCOUNT_ID || "123456b7",
            "preferences/marketing": !!userData.marketing,
            "preferences/updates": !!userData.marketing,
          },
          token,
        );
        if (!validationResponse.result) {
          return reply.code(400).send({ error: 'Validation failed', details: validationResponse.failedPolicyRequirements });
        }

        // Step 3: Create Forgerock User
        const userResponse = await createForgerockUser({
            userName: userData.mail,
            givenName: userData.givenName,
            sn: userData.sn,
            mail: userData.mail,
            brandAssociation: 'PedigreeGoodpoints',
            accountId: "123456b7",
            preferences: {
              marketing: false,
              updates: false
            },
            password:  userData.password
        }, token);
        if (!userResponse._id) {
          return reply.code(400).send({ error: 'User creation failed' });
        }

        // Respond with appropriate message
        reply.send({ message: 'Signup successful', user: userResponse });
      } catch (error) {
        reply
          .code(500)
          .send({ error: 'Signup failed', details: error.message });
      }
    },
  );
}
