const Fastify = require('fastify');
require('pino-pretty');

const { IS_DEV_ENV, COOKIE_SECRET } = require('./config');

const { patchRouting } = require('./src/presentation/routes');
const { patchContext } = require('./src/presentation/context');
const { patchAuth } = require('./src/presentation/auth');
const { attachErrorHandlers } = require('./src/presentation/errors');
const { patchDocs } = require('./src/presentation/docs');

/**
 * Initializes and configures the Fastify instance
 * @returns {import("fastify").FastifyInstance} Configured Fastify instance
 */
const bootstrapFastify = () => {
  // Create a Fastify instance with desired options
  const fastify = Fastify({
    trustProxy: true,
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
    ajv: {
      customOptions: {
        verbose: true, // Enables more detailed error messages
        allErrors: true, // Collect all errors in a single response
      },
    },
  });

  // Register request context plugin for context propagation
  // see: https://github.com/fastify/fastify-request-context
  fastify.register(require('@fastify/request-context'), {
    hook: 'preValidation',
    defaultStoreValues: {
      hasSession: false,
      sessionData: {},
    },
  });

  /**
   * ~ See details on: https://www.fastify.io/docs/latest/Reference/Server/#requestidheader
   * ~ @example https://github.com/fastify/fastify-cookie#sending
   */
  fastify.register(require('@fastify/cookie'), {
    secret: COOKIE_SECRET, // ? for cookies signature
    parseOptions: {
      secure: true,
      httpOnly: true,
      priority: 'high',
      sameSite: 'strict',
    },
    prefix: 'x-',
  });

  fastify.register(require('@fastify/auth'), { defaultRelation: 'and' });

  // Attach error handlers
  attachErrorHandlers(fastify);

  // Register Swagger and Swagger UI [Must be registered before routes]
  patchDocs(fastify);

  // Register context decorator
  patchContext(fastify);

  // Register auth decorators
  patchAuth(fastify);

  // Register plugins, routes, etc.
  patchRouting(fastify);

  if (IS_DEV_ENV) {
    // @ts-ignore - local dev dependency
    fastify.register(require('@mgcrea/fastify-request-logger'), {});

    fastify.ready(() => {
      console.log(`\nAPI Structure\n${fastify.printRoutes()}`);
    });
  }

  return fastify;
};

module.exports = { bootstrapFastify };
