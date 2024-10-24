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
        200: {
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
  },
};
