// src/middlewares/jwtMiddleware.ts

import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';
import fp from 'fastify-plugin';

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

// Middleware for JWT authentication
async function jwtMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('No token provided');
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    // You can attach the decoded token to the request if needed
    // request.user = decoded;
  } catch (err) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
}

// Wrap the middleware with fastify-plugin
export default fp(async (fastify: FastifyInstance) => {
  fastify.decorate('authenticate', jwtMiddleware);
});
