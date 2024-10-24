const {
  AddProductToCartAction,
} = require('../../../../app/actions/cart/AddProductToCart');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.addProductToCart = {
  url: '/users/~/cart/items',
  method: 'POST',
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

    const addProductToCart = new AddProductToCartAction(
      request.server.domainContext
    );

    const cart = await addProductToCart.execute(userId, productId, quantity);

    return reply.code(201).send(cart);
  },
};
