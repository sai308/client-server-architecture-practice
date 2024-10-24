const {
  ListReceiptsForUserAction,
} = require('../../../../app/actions/receipt/ListReceipts');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getReceiptsList = {
  url: '/users/~/receipts',
  method: 'GET',
  handler: async (request, reply) => {
    const userId = `${request.headers['x-user-id']}`;

    const listReceiptsForUser = new ListReceiptsForUserAction(
      request.server.domainContext
    );

    const receipts = await listReceiptsForUser.execute(userId);

    return reply.code(200).send(receipts);
  },
  schema: {
    tags: ['Receipts'],
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
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' }, // MongoDB ObjectId
            userId: { type: 'string', format: 'uuid' }, // UUID
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
                  priceAtPurchase: { type: ['number', 'null'], minimum: 0 },
                },
                required: ['product', 'quantity'],
              },
            },
            totalAmount: { type: ['number', 'null'], minimum: 0 },
            createdAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'userId', 'items', 'createdAt'],
        },
      },
    },
  },
};
