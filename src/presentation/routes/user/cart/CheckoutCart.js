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
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' }, // MongoDB ObjectId
          userId: { type: 'string', format: 'uuid' }, // UUID for user
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
                priceAtPurchase: { type: 'number', minimum: 0 },
              },
              required: ['product', 'quantity', 'priceAtPurchase'],
            },
          },
          totalAmount: { type: 'number', minimum: 0 },
          createdAt: { type: 'string', format: 'date-time' },
          _id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' }, // MongoDB ObjectId (same as 'id')
        },
        required: ['id', 'userId', 'items', 'totalAmount', 'createdAt', '_id'],
      },
    },
  },
};
