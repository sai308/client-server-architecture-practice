const { GetProductAction } = require('../../../app/actions/product/GetProduct');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getProduct = {
  url: '/products/:id',
  method: 'GET',

  handler: async (request, reply) => {
    // @ts-ignore - This is a valid reference
    const { id } = request.params;

    const getProduct = new GetProductAction(request.server.domainContext);

    const product = await getProduct.execute(id);

    return reply.code(200).send(product);
  },
  schema: {
    tags: ['Products'],
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' }, // UUID for product ID
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number', minimum: 0 },
          releaseDate: { type: 'string', format: 'date-time' },
        },
        required: ['id', 'name', 'description', 'price', 'releaseDate'],
        additionalProperties: false, // Prevents extra properties
      },
    },
  },
};
