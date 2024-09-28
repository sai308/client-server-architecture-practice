const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  updateResource: {
    url: "/resources/:id",
    method: "PUT",
    bodyLimit: 1024,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
      body: {
        type: "object",
        required: ["name", "type"],
        properties: {
          name: { type: "string" },
          type: { type: "string" },
          price: { type: "number" },
          amount: { type: "number" },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        // @ts-ignore - We know that the params is defined
        const targetId = request.params.id;

        // @ts-ignore - We know that the body is defined in the schema
        const { name, type, amount = 0, price = 0 } = request.body;

        const updated = await resourceRepository.update(targetId, {
          name,
          type,
          amount,
          price,
        });

        return reply.code(200).send(updated);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to update resource" });
      }
    },
  },
};
