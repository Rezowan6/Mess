import { Op, WhereOptions } from "sequelize";

export const buildSearchCondition = <T>(
  fields: string[],

  search?: string,
): WhereOptions<T> => {
  if (!search) {
    return {};
  }

  return {
    [Op.or]: fields.map((field) => ({
      [field]: {
        [Op.like]: `%${search}%`,
      },
    })),
  } as WhereOptions<T>;
};
