const { getReceipt } = require('./getReceipt');
const { getReceiptsList } = require('./getReceiptsList');

/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.receiptsRouter = async function (fastify, opts) {
  fastify.route(getReceipt);
  fastify.route(getReceiptsList);
};
