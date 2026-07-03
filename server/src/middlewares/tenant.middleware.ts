import { Tenant } from "@/models/index.js";
import { NextFunction, Request, Response } from "express";

export const tenantMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const tenantId = req.user.tenantId;

  const tenant = await Tenant.findByPk(tenantId);

  if (!tenant || !tenant.isActive) {
    return res.status(403).json({
      message: "Tenant inactive",
    });
  }

  req.tenant = tenant;

  next();
};
