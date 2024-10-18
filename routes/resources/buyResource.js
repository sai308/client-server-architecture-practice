const { resourceRepository } = require("./../../repositories/resource.repo");
const { receiptRepository } = require("./../../repositories/receipt.repo");

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  buyResources: {
    url: "/resources/buy",
    method: "POST",
    bodyLimit: 1024,
    schema: {
      body: {
        type: "object",
        required: ["items"],
        properties: {
          items: {
            type: "array",
            items: {
              type: "object",
              required: ["resourceId", "count"],
              properties: {
                resourceId: { type: "string" },
                count: { type: "number" },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        // @ts-ignore - We know that the body is defined in the schema
        const { items } = request.body;

        const resource = await receiptRepository.create({ items });

        return reply.code(201).send(resource);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to create resource" });
      }
    },
  },
};
