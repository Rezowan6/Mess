import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { expensesService } from "../containers/expenses.container.js";

export class ExpensesController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const expenses = await expensesService.create({
      tenantId,
      createdBy: userId,
      expensesDate: new Date(),
      ...req.body,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Expense created successfully.",
      data: expenses,
    });
  });
}
