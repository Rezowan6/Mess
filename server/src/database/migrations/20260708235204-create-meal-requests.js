"use strict";
import { DataTypes } from "sequelize";

// npx sequelize-cli db:migrate
// npx sequelize-cli migration:generate --name create-meal-sessions
// npx sequelize-cli db:migrate --to <migration-file-name>.js
// npx sequelize-cli seed:generate --name seed-system-owner

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("meal_requests", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      tenant_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "tenants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      meal_session_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "meal_sessions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      breakfast: {
        type: DataTypes.DECIMAL,
      },
      lunch: {
        type: DataTypes.DECIMAL,
      },
      dinner: {
        type: DataTypes.DECIMAL,
      },

      status: {
        type: DataTypes.ENUM("pending","approved","rejected"),
        defaultValue: "pending",
      },
      approved_by: {
        type: DataTypes.INTEGER,
      },
      approved_at: {
        type: DataTypes.DATE,
      },
      rejected_by: {
        type: DataTypes.INTEGER,
      },
      rejected_at: {
        type: DataTypes.DATE,
      },
      note: {
        type: DataTypes.STRING,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex(
      "meal_requests",
      ["tenant_id", "meal_session_id", "user_id", "date"],
      {
        unique: true,
        name: "meal_requests_tenant_id_meal_session_id_user_id_date_unique",
      },
    );

    await queryInterface.addIndex("meal_requests", ["tenant_id"], {
      name: "meal_requests_tenant_id_index",
    });
    await queryInterface.addIndex("meal_requests", ["meal_session_id"], {
      name: "meal_requests_meal_session_id_index",
    });
    await queryInterface.addIndex("meal_requests", ["user_id"], {
      name: "meal_requests_user_id_index",
    });
    await queryInterface.addIndex("meal_requests", ["status"], {
      name: "meal_requests_status_index",
    });
    await queryInterface.addIndex("meal_requests", ["tenant_id", "date"], {
      name: "meal_requests_tenant_id_date_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("meal_requests");
  },
};
