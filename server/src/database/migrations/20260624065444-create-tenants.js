"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.createTable("tenants", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      slug: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("active", "inactive", "suspended", "deleted"),
        allowNull: false,
        defaultValue: "active",
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

    // Unique Index
    await queryInterface.addIndex("tenants", ["slug"], {
      unique: true,
      name: "tenants_slug_unique",
    });

    // Query Optimization
    await queryInterface.addIndex("tenants", ["status"], {
      name: "tenants_status_index",
    });

    await queryInterface.addIndex("tenants", ["deleted_at"], {
      name: "tenants_deleted_at_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("tenants");
  },
};
