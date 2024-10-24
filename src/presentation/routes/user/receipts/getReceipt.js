const {
  GetReceiptAction,
} = require('../../../../app/actions/receipt/GetReceipt');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getReceipt = {
  url: '/users/~/receipts/:receiptId',
  method: 'GET',
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid reference
    const { receiptId } = request.params;

    const getReceipt = new GetReceiptAction(request.server.domainContext);

    const receipt = await getReceipt.execute(receiptId);

    return reply.code(200).send(receipt);
  },
  schema: {
    tags: ['Receipts'],
    params: {
      type: 'object',
      required: ['receiptId'],
      properties: {
        receiptId: { type: 'string' },
      },
    },
    response: {
      200: {
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
              },
              required: ['product', 'quantity'],
            },
          },
          createdAt: { type: 'string', format: 'date-time' },
        },
        required: ['id', 'userId', 'items', 'createdAt'],
      },
    },
  },
};
