const { echoRoute } = require("./echo");
const { resourcesRouter } = require("./resources");
const { recipesRouter } = require("./recipes");

/**
 * Patch the routing of the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports.patchRouting = (fastify) => {
  // Handle 404 responses
  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({ error: "Not Found" });
  });

  // Add a global error handler if needed
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error); // Log the error

    if (error.validation) {
      return reply
        .status(error.statusCode || 400)
        .send({ error: "Invalid request", message: error.message });
    }

    reply.status(500).send({ error: "Internal Server Error" });
  });

  // Register routes
  fastify.register(echoRoute);
  fastify.register(recipesRouter);
  fastify.register(resourcesRouter);
};
