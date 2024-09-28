// Read environment variables from .env file
require("dotenv").config();

module.exports = {
  PORT: +process.env.PORT || 3000,
  HOST: process.env.HOST || "0.0.0.0",
  NODE_ENV: process.env.NODE_ENV,
  IS_DEV_ENV: process.env.NODE_ENV === "development",
};
