"use strict";
import { DataTypes } from "sequelize";

// npx sequelize-cli db:migrate
// npx sequelize-cli migration:generate --name create-notices
// npx sequelize-cli db:migrate --to <migration-file-name>.js
// npx sequelize-cli seed:generate --name seed-system-owner

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("notices", {
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
        allowNull: true,
        references: {
          model: "meal_sessions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      created_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
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

    await queryInterface.addIndex("notices", ["tenant_id", "meal_session_id"], {
      name: "notices_tenant_id_meal_session_id",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("notices");
  },
};
