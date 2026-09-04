import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(
//   env.DB_NAME as string,
//   env.DB_USER as string,
//   env.DB_PASS as string,
//   {
//     host: env.DB_HOST,
//     dialect: "mysql",
//   },
// );

const sequelize = new Sequelize("mysql://root:aVrogHCffyiatVqNamULHDWIuqkklxhi@altaria.proxy.rlwy.net:40495/railway", {
  dialect: "mysql",
  logging: false,
});

export default sequelize;
