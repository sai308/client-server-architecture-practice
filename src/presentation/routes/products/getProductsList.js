const {
  ListProductsAction,
} = require('../../../app/actions/product/ListProducts');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getProducts = {
  url: '/products',
  method: 'GET',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        term: { type: 'string' },
        categoryId: { type: 'string' },
        developerId: { type: 'string' },
        publisherId: { type: 'string' },
        limit: { type: 'integer', minimum: 1 },
        offset: { type: 'integer', minimum: 0 },
      },
    },
  },
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid references
    const { term, limit, offset } = request.query;

    const listProducts = new ListProductsAction(request.server.domainContext);

    const products = await listProducts.execute({
      term,
      limit,
      offset,
    });

    return reply.code(200).send(products);
  },
};
