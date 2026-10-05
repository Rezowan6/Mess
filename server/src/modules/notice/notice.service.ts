import { ApiError } from "@/utils/ApiError.js";

import { noticeRepository } from "./notice.repository.js";

class NoticeService {
  async create(
    tenantId: number,
    userId: number,
    mealSessionId: number,
    payload: {
      title: string;
      description: string;
    },
  ) {
    return noticeRepository.create({
      ...payload,
      tenantId,
      mealSessionId,
      createdBy: userId,
    });
  }

  async getAll(tenantId: number, mealSessionId: number) {
    return noticeRepository.getAll(tenantId, mealSessionId);
  }

  async findById(id: number, tenantId: number) {
    const notice = await noticeRepository.findOne({tenantId, id,});

    if (!notice) {
      throw new ApiError(404, "Notice not found");
    }

    return notice;
  }

  async update(id: number,tenantId: number, payload: any) {
    const notice = await this.findById(id,tenantId);

    return await noticeRepository.update({ id }, payload);
  }

  async delete(id: number, tenantId: number,) {
    const notice = await this.findById(id, tenantId);

    if (!notice) {
      throw new ApiError(404, "Notice not foudn.");
    }

    await noticeRepository.delete({ id });

    return null;
  }
}

export const noticeService = new NoticeService();
