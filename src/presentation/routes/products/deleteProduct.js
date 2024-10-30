const {
  DeleteProductAction,
} = require('../../../app/actions/product/DeleteProduct');

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {import('fastify').RouteOptions}
 */
module.exports.deleteProduct = (fastify) => ({
  url: '/products/:id',
  method: 'DELETE',
  preValidation: fastify.auth([
    fastify.authPipeFactory(),
    fastify.authGuardFactory(),
  ]),
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid reference
    const { id } = request.params;

    const deleteProduct = new DeleteProductAction(request.server.domainContext);

    await deleteProduct.execute(id);
    return reply.code(204).send();
  },
  schema: {
    tags: ['Products'],
    headers: {
      type: 'object',
      properties: {
        'x-auth-token': {
          type: 'string',
          description: 'Session access token',
        },
      },
      required: ['x-auth-token'],
    },
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
});
