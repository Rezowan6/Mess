import { Tenant } from "@/models/index.js";

export const createTenantDB = (data: any) => {
  return Tenant.create(data);
};

export const findTenantBySlugDB = (slug: string) => {
  return Tenant.findOne({
    where: {
      slug,
    },
  });
};

export const findTenantByIdDB = (id: number) => {
  return Tenant.findByPk(id);
};

export const getAllTenantDB = () => {
  return Tenant.findAll();
};
