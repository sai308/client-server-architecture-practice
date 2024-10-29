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
    response: {
      204: {
        type: 'null',
      },
    },
  },
});
