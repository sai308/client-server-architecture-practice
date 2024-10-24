const {
  RemoveProductFromCartAction,
} = require('../../../../app/actions/cart/RemoveProductFromCart');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.removeProductFromCart = {
  url: '/users/~/cart/items',
  method: 'DELETE',
  schema: {
    body: {
      type: 'object',
      required: ['productId', 'quantity'],
      properties: {
        productId: { type: 'string' },
        quantity: { type: 'number', minimum: 1 },
      },
      additionalProperties: false, // Prevents unknown properties
    },
  },
  handler: async (request, reply) => {
    const userId = `${request.headers['x-user-id']}`;

    // @ts-ignore - This is a valid references
    const { productId, quantity } = request.body;

    const removeProductFromCart = new RemoveProductFromCartAction(
      request.server.domainContext
    );

    const cart = await removeProductFromCart.execute(
      userId,
      productId,
      quantity
    );

    return reply.code(200).send(cart);
  },
};
