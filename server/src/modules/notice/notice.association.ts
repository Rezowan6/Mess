import { MealSession, Notice, User } from "@/models/index.js";

export const setupNoticeAssociations = () => {
  Notice.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  User.hasMany(Notice, {
    foreignKey: "createdBy",
    as: "notices",
  });

  Notice.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  MealSession.hasMany(Notice, {
    foreignKey: "mealSessionId",
    as: "notices",
  });
};