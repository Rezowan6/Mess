import { env } from "@/configs/env.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  dialect: "mysql",

  logging: env.NODE_ENV === "production" ? false : console.log,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  dialectOptions: {
    connectTimeout: 10000,
  },
});

export default sequelize;
