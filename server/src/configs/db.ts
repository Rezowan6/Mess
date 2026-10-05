import { Sequelize } from "sequelize";
import { env } from "./env.js";
// production for aiven
const sequelize = new Sequelize(
  env.DB_NAME as string,
  env.DB_USER as string,
  env.DB_PASS as string,
  {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        ca: env.DB_CA,
        rejectUnauthorized: false,
      },
    },
  },
);

export default sequelize;

// development for localhost
// const sequelize = new Sequelize(
//   env.DB_NAME as string,
//   env.DB_USER as string,
//   env.DB_PASS as string,
//   {
//     host: env.DB_HOST,
//     dialect: "mysql",
//   },
// );

// production for railway
// const sequelize = new Sequelize(
//   "mysql://root:aVrogHCffyiatVqNamULHDWIuqkklxhi@altaria.proxy.rlwy.net:40495/railway",
//   {
//     dialect: "mysql",
//     logging: false,
//   },
// );
