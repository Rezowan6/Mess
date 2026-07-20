import { BaseRepository } from "@/common/repo/base.repository.js";

import { Feature } from "./feature.model.js";

class FeatureRepository extends BaseRepository<Feature> {
  constructor() {
    super(Feature);
  }

  async findBySlug(slug: string) {
    return this.findOne({
      slug,
    });
  }

  async findActiveFeatures() {
    return this.findAll({
      where: {
        isActive: true,
      },
      order: [["createdAt", "DESC"]],
    });
  }
}

export const featureRepository = new FeatureRepository();
