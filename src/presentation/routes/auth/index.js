const { authInfo } = require('./info');
const { signIn } = require('./sign-in');
const { signUp } = require('./sign-up');
const { logOut } = require('./log-out');
const { refreshAuth } = require('./refresh');

/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.authRouter = async function (fastify, opts) {
  fastify.route(signIn);
  fastify.route(signUp);

  fastify.route(logOut(fastify));
  fastify.route(authInfo(fastify));
  fastify.route(refreshAuth(fastify));
};
