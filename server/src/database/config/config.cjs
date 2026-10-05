require("dotenv").config();

const { env } = require("node:process");

module.exports = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: Number(env.DB_PORT) || 11302,
    dialect: "mysql",
  },

  production: {
    url: env.DATABASE_URL,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
