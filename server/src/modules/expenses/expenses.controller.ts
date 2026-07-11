import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiError } from "@/utils/ApiError.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { expensesService } from "../containers/expenses.container.js";

export class ExpensesController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);

    const expenses = await expensesService.create({
      tenantId,
      createdBy: userId,
      expenseDate: new Date(),
      ...req.body,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Expense created successfully.",
      data: expenses,
    });
  });

  static summary = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const data = await expensesService.summary({
      tenantId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Expense summary fetched successfully.",
      data,
    });
  });
  
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const data = await expensesService.getAll({
      tenantId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Expenses fetched successfully.",
      data,
    });
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new ApiError(400, "Valid expense id is required");
    }

    const data = await expensesService.getById({
      id,
      tenantId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Expense fetched successfully.",
      data,
    });
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new ApiError(400, "Valid expense id is required");
    }

    const data = await expensesService.update({
      id,
      tenantId,
      data: req.body,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Expense updated successfully.",
      data,
    });
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new ApiError(400, "Valid expense id is required");
    }

    await expensesService.delete({
      id,
      tenantId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Expense deleted successfully.",
      data: null,
    });
  });
}
