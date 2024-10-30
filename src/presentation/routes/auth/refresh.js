const { RefreshAuthAction } = require('../../../app/actions/auth/refresh');
const { HttpException } = require('../../errors/http');

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {import('fastify').RouteOptions}
 */
module.exports.refreshAuth = (fastify) => ({
  url: '/auth/refresh',
  method: 'PATCH',
  preValidation: fastify.auth([fastify.authPipeFactory()]),
  handler: async (request, reply) => {
    const _refreshToken = request.cookies['x-session'];

    if (!_refreshToken) {
      return new HttpException(401, 'Invalid session');
    }

    const { accessToken, refreshToken, user } = await new RefreshAuthAction(
      request.server.domainContext
    ).execute(_refreshToken, fastify.requestContext.get('sessionData'));

    return reply
      .setCookie('x-session', refreshToken, {
        maxAge: 3600 * 24 * 7, // 1 week
        signed: true,
        secure: true,
        httpOnly: true,
        path: '/',
      })
      .code(200)
      .send({
        accessToken,
        user,
      });
  },
  schema: {
    tags: ['Auth'],
    headers: {
      type: 'object',
      properties: {
        'x-auth-token': {
          type: 'string',
          description: 'Session access token',
        },
      },
      required: ['x-auth-token'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          accessToken: { type: 'string' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              username: { type: 'string' },
            },
            additionalProperties: false,
          },
        },
        required: ['accessToken', 'user'],
        additionalProperties: false,
      },
    },
  },
});
