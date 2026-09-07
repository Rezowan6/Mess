import { Sequelize } from "sequelize";
import { env } from "./env.js";

// development----
let sequelize;

// production
if (env.NODE_ENV === "development") {
  sequelize = new Sequelize(
    env.DB_NAME as string,
    env.DB_USER as string,
    env.DB_PASS as string,
    {
      host: env.DB_HOST,
      dialect: "mysql",
    },
  );
} else {
  sequelize = new Sequelize(
    "mysql://root:aVrogHCffyiatVqNamULHDWIuqkklxhi@altaria.proxy.rlwy.net:40495/railway",
    {
      dialect: "mysql",
      logging: false,
    },
  );
}

export default sequelize;
