module.exports.authGuardFactory = ({ isPrivilegeRequired = false } = {}) =>
  /**
   * @type {import('fastify').preHandlerAsyncHookHandler}
   */
  (
    async function (request, reply) {
      const sessionData = request.requestContext.get('sessionData');

      if (!sessionData?.userId) {
        return reply.code(401).send('Unauthorized: Session is required');
      }

      if (isPrivilegeRequired && !sessionData.isPrivileged) {
        return reply
          .code(403)
          .send('Forbidden: Advanced privilege is required');
      }
    }
  );
