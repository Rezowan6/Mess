"use strict";
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("party_expense_members", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      party_expense_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "party_expenses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      member_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      "party_expense_members",
      ["party_expense_id", "member_id"],
      {
        unique: true,
        name: "party_expense_members_party_expense_id_member_id_unique",
      },
    );

    await queryInterface.addIndex(
      "party_expense_members",
      ["party_expense_id"],
      {
        name: "party_expense_members_party_expense_id_index",
      },
    );

    await queryInterface.addIndex("party_expense_members", ["member_id"], {
      name: "party_expense_members_member_id_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("party_expense_members");
  },
};