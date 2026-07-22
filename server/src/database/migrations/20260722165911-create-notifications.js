"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("notifications", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

      created_by: {
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

    /**
     * Tenant + User notification list
     */
    await queryInterface.addIndex("notifications", ["tenant_id", "user_id"], {
      name: "notification_tenant_user_index",
    });

    /**
     * Unread count optimization
     * WHERE tenant_id=? AND user_id=? AND is_read=false
     */
    await queryInterface.addIndex(
      "notifications",
      ["tenant_id", "user_id", "is_read"],
      {
        name: "notification_unread_index",
      },
    );

    /**
     * Notification type filtering
     */
    await queryInterface.addIndex("notifications", ["tenant_id", "type"], {
      name: "notification_type_index",
    });

    /**
     * Latest notification ordering
     */
    await queryInterface.addIndex(
      "notifications",
      ["tenant_id", "user_id", "created_at"],
      {
        name: "notification_created_at_index",
      },
    );

    /**
     * Created by lookup
     */
    await queryInterface.addIndex("notifications", ["created_by"], {
      name: "notification_created_by_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("notifications");
  },
};
