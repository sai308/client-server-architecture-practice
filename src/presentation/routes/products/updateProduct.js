const {
  UpdateProductAction,
} = require('../../../app/actions/product/UpdateProduct');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.updateProduct = {
  url: '/products/:id',
  method: 'PUT',
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        releaseDate: { type: 'string', format: 'date-time' },
        additionalProperties: false, // Prevents unknown properties
      },
    },
  },
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid reference
    const { id } = request.params;

    const updateData = request.body;

    const updateProduct = new UpdateProductAction(request.server.domainContext);

    const product = await updateProduct.execute(id, updateData);

    return reply.code(200).send(product);
  },
};
