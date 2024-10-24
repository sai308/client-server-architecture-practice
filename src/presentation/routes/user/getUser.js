const { GetUserAction } = require('../../../app/actions/user/GetUser');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getUser = {
  url: '/users/~',
  method: 'GET',
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          cartRef: { type: 'object' },
          // Add other user properties if applicable
        },
      },
    },
  },
  handler: async (request, reply) => {
    const userId = `${request.headers['x-user-id']}`;

    const getUser = new GetUserAction(request.server.domainContext);

    const user = await getUser.execute(userId);

    return reply.code(200).send(user);
  },
};
