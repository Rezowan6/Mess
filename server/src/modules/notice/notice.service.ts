import { ApiError } from "@/utils/ApiError.js";

import { NoticeRepository } from "./notice.repository.js";

export class NoticeService {
  private noticeRepository = new NoticeRepository();

  async create(
    tenantId: number,
    userId: number,
    mealSessionId: number,
    payload: {
      title: string;
      description: string;
    },
  ) {
    return this.noticeRepository.create({
      ...payload,
      tenantId,
      mealSessionId,
      createdBy: userId,
    });
  }

  async getAll(tenantId: number, mealSessionId: number) {
    return this.noticeRepository.getAll(tenantId, mealSessionId);
  }

  async getById(id: number, tenantId: number, mealSessionId: number) {
    const notice = await this.noticeRepository.getById(id, tenantId, mealSessionId);

    if (!notice) {
      throw new ApiError(404, "Notice not found");
    }

    return notice;
  }

  async update(id: number, tenantId: number, mealSessionId: number, payload: any) {
    await this.getById(id, tenantId, mealSessionId);

    return this.noticeRepository.update(id, tenantId,mealSessionId, payload);
  }

  async delete(id: number, tenantId: number, mealSessionId: number) {
    await this.getById(id, tenantId, mealSessionId);

    await this.noticeRepository.delete(id, tenantId, mealSessionId);

    return null;
  }
}
