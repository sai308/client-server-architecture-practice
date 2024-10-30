const {
  CreateProductAction,
} = require('../../../app/actions/product/CreateProduct');

module.exports = {
  /**
   *
   * @param {import('fastify').FastifyInstance} fastify
   * @returns {import('fastify').RouteOptions}
   */
  createProduct: (fastify) => ({
    url: '/products',
    method: 'POST',
    bodyLimit: 1024,
    preValidation: fastify.auth([
      fastify.authPipeFactory(),
      fastify.authGuardFactory(),
    ]),
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
  }),
};
