"use strict";

export default  {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("invites", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      tokenHash: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      role: {
        type: Sequelize.ENUM("user", "admin", "subAdmin", "messMalik"),
        allowNull: false,
      },

      tenantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM("pending", "accepted", "expired", "revoked"),
        defaultValue: "pending",
      },

      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      acceptedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      revokedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      maxUses: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      usedCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("invites");
  },
};
