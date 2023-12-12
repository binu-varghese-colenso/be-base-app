import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default async function signinRoute(fastify: FastifyInstance): Promise<void> {
  fastify.post('/signin', async (request: FastifyRequest, reply: FastifyReply) => {
    // Sign-in logic
    reply.send({ message: 'Sign-in successful' });
  });
}
