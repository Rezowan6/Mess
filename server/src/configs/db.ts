import { env } from "@/configs/env.js";
import { Sequelize } from "sequelize";

const sequelize =
  env.NODE_ENV === "production"
    ? new Sequelize(
        env.DB_NAME as string,
        env.DB_USER as string,
        env.DB_PASS as string,
        {
          host: env.DB_HOST,
          port: Number(env.DB_PORT),
          dialect: "mysql",
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          },
        },
      )
    : new Sequelize(
        env.DB_NAME as string,
        env.DB_USER as string,
        env.DB_PASS as string,
        {
          host: env.DB_HOST,
          dialect: "mysql",
        },
      );

export default sequelize;

// import { env } from "@/configs/env.js";
// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(
//   env.DB_NAME as string,
//   env.DB_USER as string,
//   env.DB_PASS as string,
//   {
//     host: env.DB_HOST,
//     port: Number(env.DB_PORT),
//     dialect: "mysql",

//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   },
// );

// export default sequelize;

// import { env } from "@/configs/env.js";
// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(
//   env.DB_NAME as string,
//   env.DB_USER as string,
//   env.DB_PASS as string,
//   {
//     host: env.DB_HOST,
//     dialect: "mysql",
//   },
// );

// export default sequelize;

/**
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUrl = env.DB_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is missing");
    }
    await mongoose.connect(mongoUrl);

    console.log("Mongoose atlas connect success!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("MongoDB connection error:", error);
    } else {
      console.error("Unknown MongoDB connection error");
    }

    process.exit(1);
  }
};

export default connectDB;

*/
