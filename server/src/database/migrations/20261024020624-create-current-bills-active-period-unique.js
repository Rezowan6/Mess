export default {
  async up(queryInterface) {
    // NULL for soft deleted rows, so only active bills take part in the unique index.
    // VIRTUAL, because a STORED generated column conflicts with foreign key actions.
    await queryInterface.sequelize.query(`
      ALTER TABLE current_bills
      ADD COLUMN active_flag TINYINT
      GENERATED ALWAYS AS (CASE WHEN deleted_at IS NULL THEN 1 ELSE NULL END) VIRTUAL
    `);

    // Add the new index first, then drop the old one
    await queryInterface.addIndex(
      "current_bills",
      ["tenant_id", "user_id", "year", "month", "active_flag"],
      { unique: true, name: "current_bills_active_period_unique" },
    );

    await queryInterface.removeIndex(
      "current_bills",
      "current_bills_tenant_user_period_unique",
    );
  },

  async down(queryInterface) {
    // Fails if a deleted and an active bill exist for the same period
    await queryInterface.addIndex(
      "current_bills",
      ["tenant_id", "user_id", "year", "month"],
      { unique: true, name: "current_bills_tenant_user_period_unique" },
    );

    await queryInterface.removeIndex(
      "current_bills",
      "current_bills_active_period_unique",
    );

    await queryInterface.removeColumn("current_bills", "active_flag");
  },
};
