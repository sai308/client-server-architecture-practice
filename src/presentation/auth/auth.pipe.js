const { HttpException } = require('../errors/http');
const { HandleAuthAction } = require('./../../app/actions/auth/handle');

module.exports.authPipeFactory = ({ isPassive = true } = {}) =>
  /**
   * @type {import('fastify').preHandlerAsyncHookHandler}
   */
  (
    async function (request) {
      const authToken = `${request.headers['x-auth-token']}`;

      if (authToken) {
        try {
          const authAction = new HandleAuthAction(request.server.domainContext);

          const [type, tokenValue] = authToken.split(' ');

          if (type !== 'Bearer') {
            throw new HttpException(401, 'Invalid token type');
          }

          request.requestContext.set(
            'sessionData',
            await authAction.execute(tokenValue)
          );
        } catch (error) {
          request.log.error(error, 'Error while checking the session');
        }
      } else if (!isPassive) {
        throw new HttpException(401, 'Unauthorized');
      }

      // eslint-disable-next-line no-useless-return
      return;
    }
  );
