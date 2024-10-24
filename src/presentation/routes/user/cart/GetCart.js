const { GetCartAction } = require('../../../../app/actions/cart/GetCart');

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  getCart: {
    url: '/users/~/cart',
    method: 'GET',
    handler: async (request, reply) => {
      const action = new GetCartAction(request.server.domainContext);

      const userId = `${request.headers['x-user-id']}`;

      const result = await action.execute(userId);

      return reply.code(200).send(result);
    },
  },
};
