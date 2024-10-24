const { CreateUserAction } = require('../../../app/actions/user/CreateUser');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.createUser = {
  url: '/users',
  method: 'POST',
  handler: async (request, reply) => {
    const createUser = new CreateUserAction(request.server.domainContext);

    const user = await createUser.execute();

    return reply.code(201).send(user);
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
      201: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' }, // UUID for the ID
          cartRef: { type: ['string', 'null'], nullable: true }, // cartRef can be either a string or null
        },
        required: ['id', 'cartRef'],
      },
    },
  },
};
