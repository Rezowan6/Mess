"use strict";

import { DataTypes } from "sequelize";

/** @type {import("sequelize-cli").Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.createTable("invites", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      token_hash: {
        type: DataTypes.STRING(255),
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

      status: {
        type: DataTypes.ENUM("pending", "accepted", "expired", "revoked"),
        allowNull: false,
        defaultValue: "pending",
      },

      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      accepted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      revoked_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      max_uses: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
      },

      used_count: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
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

    await queryInterface.addIndex("invites", ["email", "tenant_id"], {
      name: "invites_email_tenant_index",
    });

    await queryInterface.addIndex("invites", ["token_hash"], {
      unique: true,
      name: "invites_token_hash_unique",
    });

    await queryInterface.addIndex("invites", ["tenant_id"], {
      name: "invites_tenant_index",
    });

    await queryInterface.addIndex("invites", ["status"], {
      name: "invites_status_index",
    });

    await queryInterface.addIndex("invites", ["expires_at"], {
      name: "invites_expires_at_index",
    });

    await queryInterface.addIndex("invites", ["deleted_at"], {
      name: "invites_deleted_at_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("invites");
  },
};
