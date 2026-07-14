import { ApiError } from "@/utils/ApiError.js";

import { Feature } from "./feature.model.js";
import { featureRepository } from "./feature.repository.js";

import {
  ICreateFeatureInput,
  IUpdateFeatureInput,
} from "./feature.interface.js";

 export class FeatureService {
  async create(payload: ICreateFeatureInput): Promise<Feature> {
    const existingFeature = await featureRepository.findBySlug(payload.slug);

    if (existingFeature) {
      throw new ApiError(409, "Feature slug already exists.");
    }

    return featureRepository.create(payload);
  }

  async getAll(): Promise<Feature[]> {
    return featureRepository.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async getActiveFeatures(): Promise<Feature[]> {
    return featureRepository.findActiveFeatures();
  }

  async getById(id: number): Promise<Feature> {
    const feature = await featureRepository.findById(id);

    if (!feature) {
      throw new ApiError(404, "Feature not found.");
    }

    return feature;
  }

  async update(id: number, payload: IUpdateFeatureInput): Promise<Feature> {
    const feature = await this.getById(id);

    if (payload.slug && payload.slug !== feature.slug) {
      const existingFeature = await featureRepository.findBySlug(payload.slug);

      if (existingFeature) {
        throw new ApiError(409, "Feature slug already exists.");
      }
    }

    await featureRepository.update({ id }, payload);

    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);

    await featureRepository.update(
      { id },
      {
        isActive: false,
      },
    );
  }
}

