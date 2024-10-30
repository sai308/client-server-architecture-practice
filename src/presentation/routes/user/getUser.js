const { GetUserAction } = require('../../../app/actions/user/GetUser');

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {import('fastify').RouteOptions}
 */
module.exports.getUser = (fastify) => ({
  url: '/users/~',
  method: 'GET',
  preValidation: fastify.auth([
    fastify.authPipeFactory(),
    fastify.authGuardFactory(),
  ]),
  handler: async (request, reply) => {
    const { userId } = fastify.requestContext.get('sessionData');

    const getUser = new GetUserAction(request.server.domainContext);

    const user = await getUser.execute(userId);

    return reply.code(200).send(user);
  },
  schema: {
    tags: ['Users'],
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
          id: { type: 'string', format: 'uuid' }, // UUID for the ID
          cartRef: { type: ['string', 'null'], nullable: true }, // cartRef can be either a string or null
        },
      },
    },
  },
});
