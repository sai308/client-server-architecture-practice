/**
 * Patch the the fastify instance to add context
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.patchContext = (fastify) => {
  fastify.decorate('domainContext', require('../../app/context').domainContext);
};
