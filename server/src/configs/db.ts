import { env } from "@/configs/env.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  env.DB_NAME as string,
  env.DB_USER as string,
  env.DB_PASS as string,
  {
    host: env.DB_HOST,
    dialect: "mysql",
  },
);

export default sequelize;
