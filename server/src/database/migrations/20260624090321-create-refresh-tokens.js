"use strict";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("refresh_tokens", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: "users",
          key: "id",
        },

        onDelete: "CASCADE",
      },

      tenantId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: "tenants",
          key: "id",
        },

        onDelete: "CASCADE",
      },

      tokenHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      deviceInfo: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      ipAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userAgent: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      revokedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("refresh_tokens");
  },
};
