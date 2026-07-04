"use strict";

import { DataTypes } from "sequelize";

/** @type {import("sequelize-cli").Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.createTable("tenant_memberships", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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

      role: {
        type: DataTypes.ENUM(
          "systemOwner",
          "admin",
          "manager",
          "member",
          "messMalik",
        ),
        allowNull: false,
        defaultValue: "member",
      },

      status: {
        type: DataTypes.ENUM(
          "invited",
          "active",
          "inactive",
          "left",
          "removed",
        ),
        allowNull: false,
        defaultValue: "invited",
      },

      joined_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      invited_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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

    // Composite Unique (একজন User একই Tenant-এ একবারই Member হতে পারবে)
    await queryInterface.addIndex(
      "tenant_memberships",
      ["tenant_id", "user_id"],
      {
        unique: true,
        name: "tenant_memberships_tenant_user_unique",
      },
    );

    // Query Performance
    await queryInterface.addIndex("tenant_memberships", ["tenant_id"], {
      name: "tenant_memberships_tenant_index",
    });

    await queryInterface.addIndex("tenant_memberships", ["user_id"], {
      name: "tenant_memberships_user_index",
    });

    await queryInterface.addIndex("tenant_memberships", ["role"], {
      name: "tenant_memberships_role_index",
    });

    await queryInterface.addIndex("tenant_memberships", ["status"], {
      name: "tenant_memberships_status_index",
    });

    await queryInterface.addIndex("tenant_memberships", ["deleted_at"], {
      name: "tenant_memberships_deleted_at_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("tenant_memberships");
  },
};
