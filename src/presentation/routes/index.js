const { productsRouter } = require('./products');
const { userRouter } = require('./user');

/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.patchRouting = (fastify) => {
  // Register routes
  fastify.register(productsRouter);
  fastify.register(userRouter);
};
