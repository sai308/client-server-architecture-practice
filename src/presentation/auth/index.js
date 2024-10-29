const { authPipeFactory } = require('./auth.pipe');
const { authGuardFactory } = require('./auth.guard');

/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.patchAuth = async function (fastify) {
  fastify
    .decorate('authPipeFactory', authPipeFactory)
    .decorate('authGuardFactory', authGuardFactory);
};
