import { BaseRepository } from "@/common/repo/base.repository.js";
import { AuditLog } from "@/models/index.js";

class AuditLogRepository extends BaseRepository<AuditLog> {
  constructor() {
    super(AuditLog);
  }
}

export const auditLogRepository = new AuditLogRepository();
