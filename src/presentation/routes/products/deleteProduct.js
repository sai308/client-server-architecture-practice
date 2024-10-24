const {
  DeleteProductAction,
} = require('../../../app/actions/product/DeleteProduct');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.deleteProduct = {
  url: '/products/:id',
  method: 'DELETE',
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid reference
    const { id } = request.params;

    const deleteProduct = new DeleteProductAction(request.server.domainContext);

    await deleteProduct.execute(id);
    return reply.code(204).send();
  },
  schema: {
    tags: ['Products'],
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
    response: {
      204: {
        type: 'null',
      },
    },
  },
};
