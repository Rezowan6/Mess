import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { Expenses } from "@/models/index.js";
import { Op, fn, col } from "sequelize";
import { CreateExpensesDto, UpdateExpenseDto } from "./expenses.interface.js";

export class ExpensesRepository {
  constructor(private readonly expensesModel: typeof Expenses) {}

  async createExpenses(data: CreateExpensesDto): Promise<Expenses> {
    return await this.expensesModel.create(data);
  }

  async todayExpensesCount({
    tenantId,
    expensesDate,
  }: {
    tenantId: number;
    expensesDate: Date;
  }) {
    const { start, end } = getRangeTime(expensesDate);

    return await this.expensesModel.count({
      where: { tenantId, expensesDate: { [Op.between]: [start, end] } },
    });
  }

  async getAll(tenantId: number, mealSessionId: number) {
    return await this.expensesModel.findAll({
      where: {
        tenantId,
        mealSessionId,
      },

      attributes: [
        "id",
        "amount",
        "category",
        "description",
        "signature",
        "expensesDate",
        "createdAt",
      ],

      include: [
        {
          association: "creator",
          attributes: ["id", "name", "email", "avatar"],
        },
        {
          association: "mealSession",
          attributes: ["id", "month", "year", "status"],
        },
      ],

      order: [["expensesDate", "DESC"]],
    });
  }

  async getById(id: number, tenantId: number, mealSessionId: number) {
    return this.expensesModel.findOne({
      where: {
        id,
        tenantId,
        mealSessionId
      },

      include: [
        {
          association: "creator",
          attributes: ["id", "name", "email", "avatar"],
        },
        {
          association: "mealSession",
          attributes: ["id", "month", "year", "status"],
        },
      ],
    });
  }

  async updateExpense(id: number, data: UpdateExpenseDto) {
    await this.expensesModel.update(data, {
      where: { id },
    });

    return this.expensesModel.findByPk(id);
  }

  async deleteExpense(id: number): Promise<number> {
    return this.expensesModel.destroy({
      where: { id },
    });
  }

  async getTotalExpenseByMealSession(tenantId: number, mealSessionId: number) {
    return this.expensesModel.sum("amount", {
      where: {
        tenantId,
        mealSessionId,
      },
    });
  }

  async getExpenseCountByMealSession(tenantId: number, mealSessionId: number) {
    return this.expensesModel.count({
      where: {
        tenantId,
        mealSessionId,
      },
    });
  }

  async getCategoryWiseExpense (tenantId: number, mealSessionId: number) {
    return this.expensesModel.findAll({
      where: {tenantId, mealSessionId},
      attributes: [
        "category",
        [fn("SUM", col("amount")), "totalAmount"]
      ],
      group: ["category"],

      raw: true,
    })
  }

}
