import { Deposit } from "@/models/index.js";
import { DepositRepository } from "../deposit/deposit.repository.js";
import { DepositService } from "../deposit/deposit.service.js";

const depositRepository = new DepositRepository(Deposit);

export const depositService = new DepositService(depositRepository);
