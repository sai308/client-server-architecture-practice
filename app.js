const Fastify = require('fastify');
require('pino-pretty');

const { IS_DEV_ENV } = require('./config');

const { patchRouting } = require('./src/presentation/routes');
const { patchContext } = require('./src/presentation/context');
const { attachErrorHandlers } = require('./src/presentation/errors');

/**
 * Initializes and configures the Fastify instance
 * @returns {import("fastify").FastifyInstance} Configured Fastify instance
 */
const bootstrapFastify = () => {
  // Create a Fastify instance with desired options
  const fastify = Fastify({
    exposeHeadRoutes: false,
    connectionTimeout: 20000,
    ignoreTrailingSlash: true,
    logger: !IS_DEV_ENV || {
      level: 'debug',
      transport: {
        target: '@mgcrea/pino-pretty-compact',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
    disableRequestLogging: true,
  });

  // Attach error handlers
  attachErrorHandlers(fastify);

  // Register plugins, routes, etc.
  patchRouting(fastify);

  // Register context decorator
  patchContext(fastify);

  if (IS_DEV_ENV) {
    // @ts-ignore - local dev dependency
    // require("@mgcrea/pino-pretty-compact");

    // @ts-ignore - local dev dependency
    fastify.register(require('@mgcrea/fastify-request-logger'), {});

    fastify.ready(() => {
      console.log(`\nAPI Structure\n${fastify.printRoutes()}`);
    });
  }

  return fastify;
};

module.exports = { bootstrapFastify };
