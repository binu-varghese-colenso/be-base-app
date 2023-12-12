import { FastifyRequest, FastifyReply } from 'fastify';
import axios from 'axios';

const proxyRequest = async (request: FastifyRequest, reply: FastifyReply, baseUrl: string): Promise<void> => {
  const path = (request.params as { '*': string })['*'];
  const queryParams = request.query;

  try {
    const response = await axios({
      method: request.method as any,
      url: `${baseUrl}/${path}`,
      params: queryParams,
      headers: request.headers,
      data: request.body
    });

    reply.code(response.status).send(response.data);
  } catch (error: any) {
    reply.code(error.response?.status || 500).send(error.message);
  }
};

export default proxyRequest;
