const Fastify = require("fastify");
require("pino-pretty");

const { IS_DEV_ENV } = require("./config");
const { patchRouting } = require("./routes");

/**
 * Initializes and configures the Fastify instance
 * @returns {import("fastify").FastifyInstance} Configured Fastify instance
 */
const bootstrapFastify = () => {
  // Create a Fastify instance with desired options
  const fastify = Fastify({
    exposeHeadRoutes: false,
    connectionTimeout: 20000,
    ignoreTrailingSlash: false,
    logger: !IS_DEV_ENV || {
      level: "debug",
      transport: {
        target: "@mgcrea/pino-pretty-compact",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
    disableRequestLogging: true,
  });

  // Register plugins, routes, etc.
  patchRouting(fastify);

  if (IS_DEV_ENV) {
    // @ts-ignore - local dev dependency
    // require("@mgcrea/pino-pretty-compact");

    // @ts-ignore - local dev dependency
    fastify.register(require("@mgcrea/fastify-request-logger"), {});

    fastify.ready(() => {
      console.log(`\nAPI Structure\n${fastify.printRoutes()}`);
    });
  }

  return fastify;
};

module.exports = { bootstrapFastify };
