import { BaseRepository } from "@/common/repo/base.repository.js";
import { buildSearchCondition } from "@/common/utils/search.util.js";
import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { Expenses } from "@/models/index.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { Op, col, fn } from "sequelize";

class ExpensesRepository extends BaseRepository<Expenses> {
  constructor() {
    super(Expenses);
  }

  async todayExpensesCount({
    tenantId,
    expenseDate,
    mealSessionId,
  }: {
    tenantId: number;
    expenseDate: Date;
    mealSessionId: number;
  }) {
    const { start, end } = getRangeTime(expenseDate);

    return await this.count({
      where: {
        tenantId,
        mealSessionId,
        expenseDate: { [Op.between]: [start, end] },
      },
    });
  }

  // async getAlls(
  //   tenantId: number,
  //   mealSessionId: number,
  //   query: IPaginationQuery,
  // ) {
  //   return this.paginate(
  //     {
  //       where: {
  //         tenantId,
  //         mealSessionId,
  //       },

  //       include: [
  //         {
  //           model: User,
  //           as: "creator",

  //           attributes: ["id", "name", "email", "avatar"],

  //           required: !!query.search,

  //           ...(query.search && {
  //             where: {
  //               [Op.or]: [
  //                 {
  //                   name: {
  //                     [Op.like]: `%${query.search}%`,
  //                   },
  //                 },
  //                 {
  //                   email: {
  //                     [Op.like]: `%${query.search}%`,
  //                   },
  //                 },
  //               ],
  //             },
  //           }),
  //         },

  //         {
  //           association: "mealSession",
  //           attributes: ["id", "month", "year", "status"],
  //         },
  //       ],

  //       attributes: [
  //         "id",
  //         "amount",
  //         "category",
  //         "description",
  //         "signature",
  //         "expenseDate",
  //         "createdAt",
  //       ],

  //       order: [["expenseDate", "DESC"]],
  //     },

  //     query,
  //   );
  // }

  async getAll(
    tenantId: number,
    mealSessionId: number,
    query: IPaginationQuery,
  ) {
    return await this.paginate(
      {
        where: {
          tenantId,
          mealSessionId,
          ...buildSearchCondition(["signature", "expenseDate"], query.search),
        },

        attributes: [
          "id",
          "amount",
          "category",
          "description",
          "signature",
          "expenseDate",
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
        order: [["expenseDate", "DESC"]],
      },
      query,
    );
  }

  async getById(id: number, tenantId: number, mealSessionId: number) {
    return this.findOneWithOptions({
      where: {
        id,
        tenantId,
        mealSessionId,
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

  async getTotalExpenseByMealSession(tenantId: number, mealSessionId: number) {
    return this.sum("amount", {
      where: {
        tenantId,
        mealSessionId,
      },
    });
  }

  async getExpenseCountByMealSession(tenantId: number, mealSessionId: number) {
    return this.count({
      where: {
        tenantId,
        mealSessionId,
      },
    });
  }

  async getCategoryWiseExpense(tenantId: number, mealSessionId: number) {
    return this.findAll({
      where: { tenantId, mealSessionId },
      attributes: ["category", [fn("SUM", col("amount")), "totalAmount"]],
      group: ["category"],

      raw: true,
    });
  }
}

export const expensesRepository = new ExpensesRepository();
