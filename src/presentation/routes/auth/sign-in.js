const { SignInAction } = require('../../../app/actions/auth/sign-in');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.signIn = {
  url: '/auth/sign-in',
  method: 'POST',
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid call
    const { username, password } = request.body;

    const { accessToken, refreshToken, user } = await new SignInAction(
      request.server.domainContext
    ).execute(username, password);

    return reply
      .setCookie('x-session', refreshToken, {
        maxAge: 3600 * 24 * 7, // 1 week
      })
      .code(201)
      .send({
        accessToken,
        user,
      });
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
};
