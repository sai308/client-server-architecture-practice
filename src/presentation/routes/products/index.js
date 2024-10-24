const { createProduct } = require('./createProduct');
const { getProduct } = require('./getProduct');
const { getProducts } = require('./getProductsList');

const { updateProduct } = require('./updateProduct');
const { deleteProduct } = require('./deleteProduct');

/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.productsRouter = async function (fastify, opts) {
  fastify.route(createProduct);
  fastify.route(getProduct);
  fastify.route(getProducts);
  fastify.route(updateProduct);
  fastify.route(deleteProduct);
};
