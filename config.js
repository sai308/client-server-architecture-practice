// Read environment variables from .env file
require('dotenv').config();

module.exports = {
  PORT: +process.env.APP_PORT || 3000,
  HOST: process.env.APP_HOST || '0.0.0.0',

  NODE_ENV: process.env.NODE_ENV,
  IS_DEV_ENV: process.env.NODE_ENV === 'development',

  MONGODB_DB: process.env.MONGO_DB || 'mydb',
  MONGODB_URI:
    process.env.APP_MONGO_DATABASE_URL || 'mongodb://localhost:27017',

  COOKIE_SECRET:
    process.env.COOKIE_SECRET ||
    '4e231a83e9ac4a82ea4e4445f2c267bd39b3c8e55186e231121b2675c0483d57',

  ACCESS_TOKEN_SECRET:
    process.env.ACCESS_TOKEN_SECRET ||
    '60027233be0650b3f4d88c922a9b8885b456b7b75951f614997263cdbfea8382',

  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET ||
    '606a695a4075380967ad0a2981ac149210cca2841136bb87c71269a6d81c5d76',
};
