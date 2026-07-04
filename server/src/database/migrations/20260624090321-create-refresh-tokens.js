"use strict";

import { DataTypes } from "sequelize";

/** @type {import("sequelize-cli").Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.createTable("refresh_tokens", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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

      token_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      device_info: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },

      user_agent: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },

      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      revoked_at: {
        type: DataTypes.DATE,
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

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("refresh_tokens", ["user_id"], {
      name: "refresh_tokens_user_index",
    });

    await queryInterface.addIndex("refresh_tokens", ["token_hash"], {
      unique: true,
      name: "refresh_tokens_token_hash_unique",
    });

    await queryInterface.addIndex("refresh_tokens", ["expires_at"], {
      name: "refresh_tokens_expires_at_index",
    });

    await queryInterface.addIndex("refresh_tokens", ["deleted_at"], {
      name: "refresh_tokens_deleted_at_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("refresh_tokens");
  },
};
