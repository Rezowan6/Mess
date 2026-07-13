"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("plans", {
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
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      monthly_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },

      yearly_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },

      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "BDT",
      },

      duration_days: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30,
      },

      max_members: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20,
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    });

    await queryInterface.addIndex("plans", ["slug"], {
      unique: true,
      name: "uk_plans_slug",
    });

    await queryInterface.addIndex("plans", ["name"], {
      unique: true,
      name: "uk_plans_name",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("plans");
  },
};
