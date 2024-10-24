const { getCart } = require('./GetCart');
const { addProductToCart } = require('./AddProduct');
const { removeProductFromCart } = require('./RemoveProduct');
const { checkoutCart } = require('./CheckoutCart');

/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.cartRouter = async function (fastify, opts) {
  fastify.route(getCart);
  fastify.route(addProductToCart);
  fastify.route(removeProductFromCart);
  fastify.route(checkoutCart);
};
