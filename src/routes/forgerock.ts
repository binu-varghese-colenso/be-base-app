import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import axios from 'axios';

export default async function forgerockRoute(fastify: FastifyInstance): Promise<void> {
  fastify.all('/forgerock/*', async (request: FastifyRequest, reply: FastifyReply) => {
    const pathAfterForgerock = (request.params as { '*': string })['*'];
    const BASE_URL = 'https://ciam-sb.mars.com';
    const targetUrl = `${BASE_URL}/${pathAfterForgerock}`;

    try {
      const response = await axios({
        method: request.method as any,
        url: targetUrl,
        headers: request.headers,
        data: request.body
      });

      reply.code(response.status).send(response.data);
    } catch (error: any) {
      reply.code(error.response?.status || 500).send(error.message);
    }
  });
}
