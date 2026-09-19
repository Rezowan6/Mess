"use strict";
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    // 1. নতুন column। বিদ্যমান row-গুলো default 1 পাবে (আগে মাসে একটাই ছিল)
    await queryInterface.addColumn("meal_sessions", "session_number", {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    });

    // 2. নতুন index আগে, পুরোনোটা পরে (tenant_id FK-র জন্য index সবসময় থাকে)
    await queryInterface.addIndex(
      "meal_sessions",
      ["tenant_id", "year", "month", "session_number"],
      { unique: true, name: "tenant_meal_sessions_period_number_unique" },
    );
    await queryInterface.addIndex(
      "meal_sessions",
      ["tenant_id", "status", "year", "month", "session_number"],
      { name: "meal_sessions_tenant_status_period_index" },
    );

    // 3. পুরোনো index সরানো
    await queryInterface.removeIndex(
      "meal_sessions",
      "tenant_meal_sessions_month_year_unique",
    );
    await queryInterface.removeIndex(
      "meal_sessions",
      "meal_session_status_index",
    );

    // 4. এক tenant-এ একটাই open session, DB level guarantee
    await queryInterface.sequelize.query(`
      ALTER TABLE meal_sessions
      ADD COLUMN open_tenant_id INT UNSIGNED
      GENERATED ALWAYS AS (
        CASE WHEN status = 'open' AND deleted_at IS NULL THEN tenant_id ELSE NULL END
      ) VIRTUAL
    `);
    await queryInterface.addIndex("meal_sessions", ["open_tenant_id"], {
      unique: true,
      name: "meal_sessions_one_open_per_tenant_unique",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex(
      "meal_sessions",
      "meal_sessions_one_open_per_tenant_unique",
    );
    await queryInterface.removeColumn("meal_sessions", "open_tenant_id");

    await queryInterface.addIndex("meal_sessions", ["status"], {
      name: "meal_session_status_index",
    });
    // একই মাসে একাধিক session থাকলে rollback-এর এই ধাপ fail করবে
    await queryInterface.addIndex(
      "meal_sessions",
      ["tenant_id", "month", "year"],
      { unique: true, name: "tenant_meal_sessions_month_year_unique" },
    );

    await queryInterface.removeIndex(
      "meal_sessions",
      "meal_sessions_tenant_status_period_index",
    );
    await queryInterface.removeIndex(
      "meal_sessions",
      "tenant_meal_sessions_period_number_unique",
    );
    await queryInterface.removeColumn("meal_sessions", "session_number");
  },
};
