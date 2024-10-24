const {
  ListReceiptsForUserAction,
} = require('../../../../app/actions/receipt/ListReceipts');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getReceiptsList = {
  url: '/users/~/receipts',
  method: 'GET',
  handler: async (request, reply) => {
    const userId = `${request.headers['x-user-id']}`;

    const listReceiptsForUser = new ListReceiptsForUserAction(
      request.server.domainContext
    );

    const receipts = await listReceiptsForUser.execute(userId);

    return reply.code(200).send(receipts);
  },
};
