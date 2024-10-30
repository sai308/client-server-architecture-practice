/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {import('fastify').RouteOptions}
 */
module.exports.logOut = (fastify) => ({
  url: '/auth/log-out',
  method: 'POST',
  preValidation: fastify.auth([
    fastify.authPipeFactory(),
    fastify.authGuardFactory(),
  ]),
  handler: async (request, reply) => {
    return reply.clearCookie('x-session').code(204).send();
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
      204: {
        type: 'null',
      },
    },
  },
});
