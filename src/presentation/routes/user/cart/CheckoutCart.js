const {
  CheckoutCartAction,
} = require('../../../../app/actions/cart/CheckoutCart');

/**
 * @type {import('fastify').RouteOptions}
 */

module.exports.checkoutCart = {
  url: '/users/~/cart/checkout',
  method: 'POST',
  handler: async (request, reply) => {
    const userId = `${request.headers['x-user-id']}`;

    const checkoutCart = new CheckoutCartAction(request.server.domainContext);

    const receipt = await checkoutCart.execute(userId);

    return reply.code(201).send(receipt);
  },
};
