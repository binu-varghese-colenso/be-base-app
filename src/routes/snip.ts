import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import proxyRequest from '../utils/proxyRequest';

export default async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.all('/api/snip/*', async (request: FastifyRequest, reply: FastifyReply) => {
    return proxyRequest(request, reply, 'https://snip.example.com');
  });
}
