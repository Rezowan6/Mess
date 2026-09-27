"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.addColumn("notifications", "meal_session_id", {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,

      references: {
        model: "meal_sessions",
        key: "id",
      },

      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    /**
     * Tenant + Meal Session notification lookup
     */
    await queryInterface.addIndex(
      "notifications",
      ["tenant_id", "meal_session_id"],
      {
        name: "notification_tenant_meal_session_index",
      },
    );

    /**
     * Tenant + User + Meal Session notification lookup
     */
    await queryInterface.addIndex(
      "notifications",
      ["tenant_id", "user_id", "meal_session_id"],
      {
        name: "notification_user_meal_session_index",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.removeIndex(
      "notifications",
      "notification_user_meal_session_index",
    );

    await queryInterface.removeIndex(
      "notifications",
      "notification_tenant_meal_session_index",
    );

    await queryInterface.removeColumn("notifications", "meal_session_id");
  },
};
