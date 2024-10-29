const { SignUpAction } = require('../../../app/actions/auth/sign-up');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.signUp = {
  url: '/auth/sign-up',
  method: 'POST',
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid call
    const { username, password } = request.body;

    await new SignUpAction(request.server.domainContext).execute(
      username,
      password
    );

    return reply.code(201).send();
  },
  schema: {
    tags: ['Auth'],
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
        type: 'null',
      },
    },
  },
};
