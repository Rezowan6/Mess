"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.addColumn("users", "role", {
      type: DataTypes.ENUM(
        "systemOwner",
        "admin",
        "member",
        "manager",
        "messMalik",
      ),
      allowNull: false,
      defaultValue: "member",
    });

    await queryInterface.addIndex("users", ["role"], {
      name: "users_role_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("users", "users_role_index");

    await queryInterface.removeColumn("users", "role");

    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_users_role;",
    );
  },
};