import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { Expenses } from "@/models/index.js";
import { Op } from "sequelize";
import { CreateExpensesDto } from "./expenses.interface.js";

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

  async getAll(tenantId: number) {
    return await this.expensesModel.findAll({
      where: {
        tenantId,
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
      ],

      order: [["expensesDate", "DESC"]],
    });
  }
}
