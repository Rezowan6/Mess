import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { ApiError } from "@/utils/ApiError.js";
import { getCurrentDate } from "@/utils/date.util.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { expenseService } from "./expenses.service.js";

class ExpensesController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);
    const expenseDate = getCurrentDate();

    const expenses = await expenseService.create({
      tenantId,
      mealSessionId,
      createdBy: userId,
      expenseDate,
      ...req.body,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Expense created successfully.",
      data: expenses,
    });
  });

  summary = asyncHandler(async (req: Request, res: Response) => {
    const context = getTenantContext(req);

    const { tenantId, session, mealSessionId } = getTenantContext(req);

    const data = await expenseService.summary({
      tenantId,
      mealSessionId,
      session,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Expense summary fetched successfully.",
      data,
    });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {

    const context = getTenantContext(req);
    const { tenantId, mealSessionId } = getTenantContext(req);

    const query = req.query as IPaginationQuery;

    const expense = await expenseService.getAll({
      tenantId,
      mealSessionId,
      query,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Expenses fetched successfully.",
      data: expense.data,
      meta: expense.meta,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new ApiError(400, "Valid expense id is required");
    }

    const data = await expenseService.getById({
      id,
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Expense fetched successfully.",
      data,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new ApiError(400, "Valid expense id is required");
    }

    const data = await expenseService.update({
      id,
      tenantId,
      mealSessionId,
      data: req.body,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Expense updated successfully.",
      data,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new ApiError(400, "Valid expense id is required");
    }

    await expenseService.delete({
      id,
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Expense deleted successfully.",
      data: null,
    });
  });
}

export const expenseController = new ExpensesController();
