"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("plan_features", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      plan_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      feature_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "features",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      value: {
        type: DataTypes.STRING(255),
        allowNull: true,
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

    await queryInterface.addIndex("plan_features", ["plan_id", "feature_id"], {
      unique: true,
      name: "plan_features_plan_id_feature_id_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("plan_features");
  },
};
