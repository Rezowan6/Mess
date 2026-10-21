import { DataTypes } from "sequelize";

export default {
  async up(queryInterface) {
    await queryInterface.createTable("current_bills", {
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
        onDelete: "RESTRICT",
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("pending", "partially_paid", "paid"),
        allowNull: false,
        defaultValue: "pending",
      },
      created_by: {
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

    await queryInterface.addIndex(
      "current_bills",
      ["tenant_id", "user_id", "year", "month"],
      {
        unique: true,
        name: "current_bills_tenant_user_period_unique",
      },
    );

    await queryInterface.addIndex(
      "current_bills",
      ["tenant_id", "year", "month", "status"],
      {
        name: "current_bills_tenant_period_status_index",
      },
    );

    await queryInterface.addIndex("current_bills", ["user_id"], {
      name: "current_bills_user_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("current_bills");
  },
};
