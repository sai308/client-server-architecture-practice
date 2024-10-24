const {
  ListProductsAction,
} = require('../../../app/actions/product/ListProducts');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getProducts = {
  url: '/products',
  method: 'GET',

  handler: async (request, reply) => {
    // @ts-ignore - This is a valid references
    const { term, limit, page, sort } = request.query;

    const offset = limit * (page - 1);

    const listProducts = new ListProductsAction(request.server.domainContext);

    const products = await listProducts.execute({
      term,
      sort,
      limit,
      offset,
    });

    return reply.code(200).send(products);
  },
  schema: {
    tags: ['Products'],
    querystring: {
      type: 'object',
      properties: {
        term: { type: 'string' },
        limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
        page: { type: 'integer', minimum: 1, default: 1 },
        sort: { type: 'string', enum: ['name', 'price', 'releaseDate'] },
      },
    },
    response: {
      200: {
        type: 'array',
        items: {
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
  },
};
