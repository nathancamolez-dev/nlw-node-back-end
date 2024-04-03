import { CheckInPrismaRepository } from "../../repositories/prisma/checkIn-prisma-repository"
import { EventsPrismaRepo } from "../../repositories/prisma/events-prisma-repository"
import { RegistercheckInsUseCase } from "../checkIn"
import { RegisterEventsUseCase } from "../register-event"

export function makeRegisterCheckInUseCase() {
  const prismaCheckInrepo = new CheckInPrismaRepository
  const registerCheckInUseCase = new RegistercheckInsUseCase(prismaCheckInrepo)

  return registerCheckInUseCase
}