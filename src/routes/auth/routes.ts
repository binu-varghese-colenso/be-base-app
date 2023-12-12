import { FastifyInstance } from 'fastify';
import signinRoute from './signin';
import signupRoute from './signup';

export default async function authRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.register(signinRoute);
  fastify.register(signupRoute);
}
