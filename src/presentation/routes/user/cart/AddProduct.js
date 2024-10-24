const {
  AddProductToCartAction,
} = require('../../../../app/actions/cart/AddProductToCart');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.addProductToCart = {
  url: '/users/~/cart/items',
  method: 'POST',
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
  schema: {
    tags: ['Cart'],
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
    body: {
      type: 'object',
      required: ['productId', 'quantity'],
      properties: {
        productId: { type: 'string' },
        quantity: { type: 'number', minimum: 1 },
      },
      additionalProperties: false, // Prevents unknown properties
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' }, // MongoDB ObjectId
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' }, // UUID for product
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number', minimum: 0 },
                    releaseDate: { type: 'string', format: 'date-time' },
                  },
                  required: [
                    'id',
                    'name',
                    'description',
                    'price',
                    'releaseDate',
                  ],
                },
                quantity: { type: 'integer', minimum: 1 },
                addedAt: { type: 'string', format: 'date-time' },
              },
              required: ['product', 'quantity', 'addedAt'],
            },
          },
          userId: { type: 'string', format: 'uuid' }, // UUID for user
        },
        required: ['id', 'items', 'userId'],
      },
    },
  },
};
