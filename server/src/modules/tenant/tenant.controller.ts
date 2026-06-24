import { Request, Response, NextFunction } from "express";
import {
  createTenantService,
  getTenantService,
  getTenantsService,
} from "./tenant.service.js";

export const createTenant = async (req:Request, res:Response, next:NextFunction) => {
  const {id, messName} = req.user;
  try {
    const tenant = await createTenantService(id, messName, );

    res.status(201).json({
      success: true,

      data: tenant,
    });
  } catch (err) {
    next(err);
  }
};

export const getTenant = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const tenant = await getTenantService(Number(req.params.id));

    res.json({
      success: true,

      data: tenant,
    });
  } catch (err) {
    next(err);
  }
};

export const getTenants = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const tenants = await getTenantsService();

    res.json({
      success: true,

      data: tenants,
    });
  } catch (err) {
    next(err);
  }
};
