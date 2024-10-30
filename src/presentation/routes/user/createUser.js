const { CreateUserAction } = require('../../../app/actions/user/CreateUser');

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {import('fastify').RouteOptions}
 */
module.exports.createUser = (fastify) => ({
  url: '/users',
  method: 'POST',
  preValidation: fastify.auth([
    fastify.authPipeFactory(),
    fastify.authGuardFactory({ isPrivilegeRequired: true }),
  ]),
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid call
    const { username, password } = request.body;

    const createUser = new CreateUserAction(request.server.domainContext);

    const user = await createUser.execute(username, password);

    return reply.code(201).send(user);
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
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: { type: 'string', minLength: 4, maxLength: 32 },
        password: { type: 'string', minLength: 8, maxLength: 32 },
      },
      additionalProperties: false, // Prevents unknown properties
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' }, // UUID for the ID
          username: { type: 'string' },
          cartRef: { type: ['string', 'null'], nullable: true }, // cartRef can be either a string or null
        },
        required: ['id', 'cartRef'],
      },
    },
  },
});
