const { GetProductAction } = require('../../../app/actions/product/GetProduct');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getProduct = {
  url: '/products/:id',
  method: 'GET',
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
  },
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid reference
    const { id } = request.params;

    const getProduct = new GetProductAction(request.server.domainContext);

    const product = await getProduct.execute(id);

    return reply.code(200).send(product);
  },
};
