const { productsRouter } = require('./products');
const { userRouter } = require('./user');
const { authRouter } = require('./auth');

/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.patchRouting = (fastify) => {
  // Register routes
  fastify.register(productsRouter);
  fastify.register(authRouter);
  fastify.register(userRouter);
};
