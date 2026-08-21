import { IPaginationQuery } from "@/common/types/pagination.interface.js";
import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { partyExpenseService } from "./partyExpense.service.js";

class PartyExpenseController {
  // create
  create = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const partyExpense = await partyExpenseService.create(
      {
        tenantId,
        mealSessionId,
        ...req.body,
      },
      req.body.memberIds,
    );

    return sendResponse(res, {
      statusCode: 201,
      message: "Party expense created successfully.",
      data: partyExpense,
    });
  });

  // getAll
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const query = req.query as IPaginationQuery;

    const partyExpenses = await partyExpenseService.getAll({
      tenantId,
      mealSessionId,
      query,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Party expenses fetched successfully.",
      data: partyExpenses.data,
      meta: partyExpenses.meta,
    });
  });
}

export const partyExpenseController = new PartyExpenseController();
