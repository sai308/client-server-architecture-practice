const fs = require('node:fs');
const os = require('node:os');

const dotenv = require('dotenv');

// Determine which env file to use
const envFile = fs.existsSync('./prod.env') ? './prod.env' : './.env';

// Load environment variables from the chosen file
dotenv.config({ path: envFile });

console.log(`[PM2] Loaded environment variables from: ${envFile}`);

module.exports = {
  apps: [
    {
      name: 'my-app', // Application name
      script: './server.js', // Entry point
      exec_mode: 'cluster', // Enable cluster mode
      max_memory_restart: '500M', // Restart if more than 500MB of memory is used
      instances: Math.min(4, os.cpus().length), // Number of instances (use 4 or all CPUs)
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development', // Default environment
      },
      env_production: {
        NODE_ENV: 'production',
        APP_PORT: process.env.APP_PORT || 3000,
        APP_HOST: process.env.APP_HOST || '0.0.0.0',
        PRISMA_SYNC_DB: process.env.PRISMA_SYNC_DB || 'false',
        PRISMA_REBUILD_CLIENT: process.env.PRISMA_REBUILD_CLIENT,
        APP_PG_DATABASE_URL: process.env.APP_PG_DATABASE_URL,
        APP_MONGO_DATABASE_URL: process.env.APP_MONGO_DATABASE_URL,
      },
    },
  ],
};
