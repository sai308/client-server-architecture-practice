const {
  CheckoutCartAction,
} = require('../../../../app/actions/cart/CheckoutCart');

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {import('fastify').RouteOptions}
 */
module.exports.checkoutCart = (fastify) => ({
  url: '/users/~/cart/checkout',
  method: 'POST',
  preValidation: fastify.auth([
    fastify.authPipeFactory(),
    fastify.authGuardFactory(),
  ]),
  handler: async (request, reply) => {
    const { userId } = fastify.requestContext.get('sessionData');

    const checkoutCart = new CheckoutCartAction(request.server.domainContext);

    const receipt = await checkoutCart.execute(userId);

    return reply.code(201).send(receipt);
  },
  schema: {
    tags: ['Cart'],
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
});
