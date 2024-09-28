const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  getResources: {
    url: "/resources",
    method: "GET",
    handler: async (request, reply) => {
      try {
        const list = await resourceRepository.read();

        return reply.code(200).send(list);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to fetch resources" });
      }
    },
  },
};
