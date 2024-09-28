const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  createResource: {
    url: "/resources",
    method: "POST",
    bodyLimit: 1024,
    schema: {
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
        // @ts-ignore - We know that the body is defined in the schema
        const { name, type, amount = 0, price = 0 } = request.body;

        const resource = await resourceRepository.create({
          name,
          type,
          amount,
          price,
        });

        return reply.code(201).send(resource);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to create resource" });
      }
    },
  },
};
