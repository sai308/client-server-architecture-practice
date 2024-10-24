const { createUser } = require('./createUser');
const { getUser } = require('./getUser');

const { cartRouter } = require('./cart');
const { receiptsRouter } = require('./receipts');

/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.userRouter = async function (fastify, opts) {
  fastify.route(getUser);
  fastify.route(createUser);

  fastify.register(cartRouter);
  fastify.register(receiptsRouter);
};
