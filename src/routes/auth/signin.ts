import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import axios from 'axios';

const FORGEROCK_LOGIN_ENDPOINT =
  process.env.FORGEROCK_LOGIN_ENDPOINT ||
  'https://ciam-sb.mars.com/auth/json/realms/root/realms/Petcare/authenticate?authIndexType=service&authIndexValue=PetcareAuth';

interface SigninRequestBody {
  userName: string;
  password: string;
}

export default async function signinRoute(
  fastify: FastifyInstance,
): Promise<void> {
  fastify.post(
    '/signin',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userData = request.body as SigninRequestBody;
        const response = await axios.post(
          FORGEROCK_LOGIN_ENDPOINT,
          {},
          {
            headers: {
              'x-openam-username': userData.userName,
              'x-openam-password': userData.password,
              'Accept-API-Version': 'resource=2.0, protocol=1.0',
              // Include the 'Cookie' header if necessary
            },
          },
        );

        reply.send({ ...response.data, message: 'Sign-in successful' });
      } catch (error) {
        console.error('Error during user sign-in:', error);
        if (error.response.data) {
          console.log(JSON.stringify(error.response.data));
        }
        reply
          .code(401)
          .send({ data: error?.response?.data, error: 'Failed to Sign-in' });
      }
    },
  );
}
