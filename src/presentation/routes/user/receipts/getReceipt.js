const {
  GetReceiptAction,
} = require('../../../../app/actions/receipt/GetReceipt');

/**
 * @type {import('fastify').RouteOptions}
 */
module.exports.getReceipt = {
  url: '/users/~/receipts/:receiptId',
  method: 'GET',
  schema: {
    params: {
      type: 'object',
      required: ['receiptId'],
      properties: {
        receiptId: { type: 'string' },
      },
    },
  },
  handler: async (request, reply) => {
    // @ts-ignore - This is a valid reference
    const { receiptId } = request.params;

    const getReceipt = new GetReceiptAction(request.server.domainContext);

    const receipt = await getReceipt.execute(receiptId);

    return reply.code(200).send(receipt);
  },
};
