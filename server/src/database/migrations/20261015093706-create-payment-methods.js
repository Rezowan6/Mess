import { DataTypes } from "sequelize";

export default {
  async up(queryInterface) {
    await queryInterface.createTable("payment_methods", {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
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
        onDelete: "RESTRICT",
      },
      provider: {
        type: DataTypes.ENUM("BKASH", "NAGAD", "ROCKET", "BANK"),
        allowNull: false,
      },
      account_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      account_number_encrypted: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      account_last4: {
        type: DataTypes.CHAR(4),
        allowNull: false,
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE payment_methods
      ADD COLUMN active_default_user_id INT UNSIGNED
      GENERATED ALWAYS AS (
        CASE
          WHEN is_default = 1
            AND is_active = 1
            AND deleted_at IS NULL
          THEN user_id
          ELSE NULL
        END
      ) STORED
    `);

    await queryInterface.addIndex(
      "payment_methods",
      ["tenant_id", "active_default_user_id"],
      {
        name: "uq_payment_methods_tenant_active_default_user",
        unique: true,
      },
    );

    await queryInterface.addIndex(
      "payment_methods",
      ["tenant_id", "user_id"],
      {
        name: "idx_payment_methods_tenant_user",
      },
    );

    await queryInterface.addIndex(
      "payment_methods",
      ["tenant_id", "is_active"],
      {
        name: "idx_payment_methods_tenant_active",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("payment_methods");
  },
};