const { GetUserAction } = require('../../../app/actions/user/GetUser');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getUser = {
  url: '/users/~',
  method: 'GET',
  handler: async (request, reply) => {
    const userId = `${request.headers['x-user-id']}`;

    const getUser = new GetUserAction(request.server.domainContext);

    const user = await getUser.execute(userId);

    return reply.code(200).send(user);
  },
  schema: {
    tags: ['Users'],
    headers: {
      type: 'object',
      properties: {
        'x-user-id': {
          type: 'string',
          description: 'Target user ID',
        },
      },
      required: ['x-user-id'],
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
};
