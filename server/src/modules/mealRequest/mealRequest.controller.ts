import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiError } from "@/utils/ApiError.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { mealRequestService } from "./mealRequest.service.js";

export class MealRequestController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { userId, tenantId, mealSessionId } = getTenantContext(req);

    const mealRequest = await mealRequestService.create({
      payload: req.body,
      userId,
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "",
      data: mealRequest,
    });
  });

  createByDate = asyncHandler(async (req: Request, res: Response) => {
    const { userId, tenantId, mealSessionId } = getTenantContext(req);

    const mealRequest = await mealRequestService.createByDate({
      ...req.body,
      userId,
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Meal request create successfully.",
      data: mealRequest,
    });
  });

  getRejectMeals = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const rejectMeals = await mealRequestService.getRejectMeals({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Reject Meals retrived successfully.",
      data: rejectMeals,
    });
  });

  getApproves = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const approvedMeal = await mealRequestService.getApproves({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Meal approve request get successfully.",
      data: approvedMeal,
    });
  });

  mypendingRequest = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);

    const mealRequest = await mealRequestService.myPendingRequest({
      tenantId,
      userId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "My Meal requests fetched successfully.",
      data: mealRequest,
    });
  });

  getPendingRequests = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, mealSessionId } = getTenantContext(req);

    const mealRequest = await mealRequestService.getPendingRequests({
      tenantId,
      mealSessionId,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Pending meal requests fetched successfully.",
      data: mealRequest,
    });
  });

  approveRange = asyncHandler(async (req: Request, res: Response) => {
    const {
      tenantId,
      userId: managerId,
      mealSessionId,
    } = getTenantContext(req);

    const { fromDate, toDate } = req.body;

    const result = await mealRequestService.approveRange({
      tenantId,
      managerId,
      mealSessionId,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Meal requests approved successfully.",
      data: result,
    });
  });

  approve = asyncHandler(async (req: Request, res: Response) => {
    const {
      tenantId,
      userId: managerId,
      mealSessionId,
    } = getTenantContext(req);

    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new ApiError(400, "Valid request id is required");
    }
    const result = await mealRequestService.approve({
      id,
      tenantId,
      managerId,
      mealSessionId,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Meal request approved successfully",
      data: result,
    });
  });

  approveAll = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId: managerId } = getTenantContext(req);
    const { approvedCount } = await mealRequestService.approveAllPending({
      tenantId,
      managerId,
      date: new Date(req.query.date as string),
    });

    sendResponse(res, {
      statusCode: 200,
      message: "All meal request approved successfully",
      data: approvedCount,
    });
  });

  reject = asyncHandler(async (req: Request, res: Response) => {
    const {
      tenantId,
      userId: managerId,
      mealSessionId,
    } = getTenantContext(req);

    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new ApiError(400, "Valid request id is required");
    }

    const result = await mealRequestService.reject({
      id,
      tenantId,
      mealSessionId,
      managerId,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Meal request rejected successfully",
      data: result,
    });
  });

  parmanetDelete = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId, mealSessionId } = getTenantContext(req);

    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new ApiError(400, "Valid request id is required");
    }

    const result = await mealRequestService.parmanetDelete({
      id,
      tenantId,
      mealSessionId,
      userId,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Meal request permanently deleted successfully",
      data: result,
    });
  });
}

export const mealRequestController = new MealRequestController();
