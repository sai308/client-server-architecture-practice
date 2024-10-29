/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {import('fastify').RouteOptions}
 */
module.exports.authInfo = (fastify) => ({
  url: '/auth/info',
  method: 'GET',
  preValidation: fastify.auth([
    fastify.authPipeFactory(),
    fastify.authGuardFactory(),
  ]),
  handler: async (request, reply) => {
    return request.requestContext.get('sessionData');
  },
  schema: {
    tags: ['Auth'],
    response: {
      204: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          username: { type: 'string' },
          isPrivileged: { type: 'boolean' },
        },
        required: ['id', 'username', 'isPrivileged'],
      },
    },
  },
});
