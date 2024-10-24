const { CreateUserAction } = require('../../../app/actions/user/CreateUser');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.createUser = {
  url: '/users',
  method: 'POST',
  // schema: {
  //   body: {
  //     type: 'object',
  //     // Since users are abstract without login credentials,
  //     // you may not need any body parameters.
  //     // If you require any, define them here.
  //     properties: {
  //       // Add properties if needed
  //     },
  //   },
  // },
  handler: async (request, reply) => {
    const createUser = new CreateUserAction(request.server.domainContext);

    const user = await createUser.execute();

    return reply.code(201).send(user);
  },
};
