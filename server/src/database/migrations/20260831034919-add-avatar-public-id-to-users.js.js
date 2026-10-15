"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.addColumn("users", "avatar_public_id", {
      type: DataTypes.STRING,
      allowNull: true,
      after: "avatar",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("users", "avatar_public_id");
  },
};
