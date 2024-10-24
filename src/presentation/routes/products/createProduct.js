const {
  CreateProductAction,
} = require('../../../app/actions/product/CreateProduct');

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  createProduct: {
    url: '/products',
    method: 'POST',
    bodyLimit: 1024,
    handler: async (request, reply) => {
      const productData = request.body;

      const createProduct = new CreateProductAction(
        request.server.domainContext
      );

      // @ts-ignore - This is a valid call
      const product = await createProduct.execute(productData);

      return reply.code(201).send(product);
    },
    schema: {
      tags: ['Products'],
      body: {
        type: 'object',
        required: ['name', 'price'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number', minimum: 0 },
          releaseDate: { type: 'string', format: 'date-time' },
        },
        additionalProperties: false, // Prevents unknown properties
      },
    },
  },
};
