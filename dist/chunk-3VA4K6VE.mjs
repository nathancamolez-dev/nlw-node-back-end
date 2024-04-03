import {
  CheckInPrismaRepository
} from "./chunk-HBTF5XGZ.mjs";
import {
  RegistercheckInsUseCase
} from "./chunk-GCUO57KS.mjs";

// src/use-cases/fabrics/make-checkIn-register.ts
function makeRegisterCheckInUseCase() {
  const prismaCheckInrepo = new CheckInPrismaRepository();
  const registerCheckInUseCase = new RegistercheckInsUseCase(prismaCheckInrepo);
  return registerCheckInUseCase;
}

export {
  makeRegisterCheckInUseCase
};
