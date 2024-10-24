const { PORT, HOST } = require('./config');

const { mongoDBAdapter } = require('./src/infra/database/mongodb');
const { postgresAdapter } = require('./src/infra/database/postgres');

// Import the bootstrapFastify function from app.js
const { bootstrapFastify } = require('./app');

// Declare a variable to hold the Fastify instance
let fastify;

/**
 * Function to start the Fastify server
 */
const startServer = async () => {
  try {
    await Promise.all([mongoDBAdapter.connect(), postgresAdapter.connect()]);

    // Initialize Fastify by calling bootstrapFastify
    fastify = bootstrapFastify();

    // Define the port and host
    const port = PORT; // Use the port from the config
    const host = HOST; // Use the host from the config

    // Start listening on the specified port and host
    await fastify.listen({ port, host });
  } catch (err) {
    // If Fastify instance is available, log the error using Fastify's logger
    if (fastify && fastify.log) {
      fastify.log.error(err);
    } else {
      // Fallback to console logging if Fastify isn't initialized
      console.error('Error starting server:', err);
    }
    // Exit the process with a failure code
    process.exit(1);
  }
};

/**
 * Function to gracefully shut down the server
 * @param {string} signal - The signal received (e.g., SIGINT, SIGTERM)
 */
const shutdown = async (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  if (fastify) {
    try {
      // Close the Fastify server
      await fastify.close();
      console.log('Fastify server closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  } else {
    // If Fastify isn't initialized, exit immediately
    process.exit(0);
  }
};

// Listen for termination signals to initiate graceful shutdown
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // It's recommended to shut down the server in case of unhandled rejections
  shutdown('unhandledRejection');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // It's recommended to shut down the server in case of uncaught exceptions
  shutdown('uncaughtException');
});

// Start the server
startServer();
