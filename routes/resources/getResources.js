const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports = {
  /**
   * @type {import('fastify').RouteOptions}
   */
  getResources: {
    url: "/resources",
    method: "GET",
    schema: {
      querystring: {
        type: "object",
        properties: {
          term: { type: "string" },
          page: { type: "number" },
          limit: { type: "number" },
          sort: { type: "string" },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const {
          // @ts-ignore - We know that the query is defined or has a default value
          term = "",
          // @ts-ignore - We know that the query is defined or has a default value
          page = 1,
          // @ts-ignore - We know that the query is defined or has a default value
          limit = 10,
          // @ts-ignore - We know that the query is defined or has a default value
          sort = "createdAt",
        } = request.query;

        const offset = (page - 1) * limit;

        const list = await resourceRepository.find({
          term,
          limit,
          offset,
          sort,
        });

        return reply.code(200).send(list);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to fetch resources" });
      }
    },
  },
};
