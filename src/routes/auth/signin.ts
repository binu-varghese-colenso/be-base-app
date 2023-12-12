import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import getIdmToken from '../../utils/getIdmToken';
import oauthLogin from '../../utils/oauthLogin';
import decodeIdToken from '../../utils/decodeIdToken';
interface SigninRequestBody {
  email: string;
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
        // Step 1: Get IDM Token
        const tokenResponse = await getIdmToken();
        const token = tokenResponse.access_token;
        if (!tokenResponse.access_token) {
          return reply.code(401).send({ error: 'Failed to obtain token' });
        }
        // Step 2: oauthLogin call
        const userTokenResponse = await oauthLogin(
          userData.email,
          userData.password,
          token,
        );
        if (!userTokenResponse.id_token) {
          return reply
            .code(400)
            .send({ error: 'Failed to Sign-in', data: userTokenResponse });
        }

        //step3 decode id_token

        const userDataResponse = await decodeIdToken(
          userTokenResponse.id_token,
        );
        if (!userDataResponse.tokenName) {
          return reply
            .code(400)
            .send({ error: 'Failed to Sign-in', data: userDataResponse });
        }

        reply.send(userDataResponse);
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
