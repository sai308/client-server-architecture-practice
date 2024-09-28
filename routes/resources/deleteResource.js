const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  deleteResource: {
    url: "/resources/:id",
    method: "DELETE",
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
    },
    handler: async (request, reply) => {
      try {
        // @ts-ignore - We know that the params is defined
        const targetId = request.params.id;

        const deleted = await resourceRepository.delete(targetId);

        return reply.code(200).send(deleted);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to delete resource" });
      }
    },
  },
};
