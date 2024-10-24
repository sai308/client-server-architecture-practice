/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.attachErrorHandlers = (fastify) => {
  // Handle 404 responses
  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({ error: 'Not Found' });
  });

  // Add a global error handler if needed
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error.cause ?? error); // Log the error

    if (error.validation || error.statusCode) {
      return reply
        .status(error.statusCode || 400)
        .send({ error: 'Invalid request', message: error.message });
    }

    reply.status(500).send({ error: 'Internal Server Error' });
  });
};
