/**
 * Patch the the fastify instance to add context
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.patchDocs = (fastify) => {
  // Register Swagger plugin
  fastify.register(require('@fastify/swagger'), {
    swagger: {
      info: {
        title: 'Product API',
        description: 'API documentation for the product endpoints',
        version: '0.4.0',
      },
      host: 'localhost',
      basePath: '/api',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'Products', description: 'Product related end-points' },
        { name: 'Users', description: 'User related end-points' },
        { name: 'Cart', description: 'Cart related end-points' },
        { name: 'Receipts', description: 'Receipt related end-points' },
      ],
    },
  });

  // Register Swagger UI to expose the documentation
  // @ts-ignore - This is a valid call
  fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs', // The route to access Swagger UI
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    exposeRoute: true,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
  });
};
