import { DataTypes } from "sequelize";

export default {
  async up(queryInterface) {
    await queryInterface.createTable("audit_logs", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
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
        onDelete: "RESTRICT",
      },
      actor_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      action: {
        type: DataTypes.ENUM(
          "SETTLEMENT_CREATED",
          "SETTLEMENT_PAID",
          "SETTLEMENT_CONFIRMED",
          "SETTLEMENT_CANCELLED",
          "SETTLEMENT_DISPUTED",
          "PAYMENT_METHOD_CREATED",
          "PAYMENT_METHOD_UPDATED",
          "PAYMENT_METHOD_DELETED",
        ),
        allowNull: false,
      },
      entity_type: {
        type: DataTypes.ENUM("SETTLEMENT", "PAYMENT_METHOD"),
        allowNull: false,
      },
      entity_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      old_values: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      new_values: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      request_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      user_agent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.addIndex("audit_logs", ["tenant_id", "created_at"], {
      name: "idx_audit_logs_tenant_created_at",
    });

    await queryInterface.addIndex(
      "audit_logs",
      ["tenant_id", "entity_type", "entity_id"],
      {
        name: "idx_audit_logs_tenant_entity",
      },
    );

    await queryInterface.addIndex("audit_logs", ["tenant_id", "actor_id"], {
      name: "idx_audit_logs_tenant_actor",
    });

    await queryInterface.addIndex("audit_logs", ["request_id"], {
      name: "idx_audit_logs_request_id",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("audit_logs");
  },
};
