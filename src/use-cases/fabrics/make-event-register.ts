import { EventsPrismaRepo } from "../../repositories/prisma/events-prisma-repository"
import { RegisterEventsUseCase } from "../register-event"

export function makeRegisterEventService() {
  const prismaEventRepository = new EventsPrismaRepo
  const registerEvent = new RegisterEventsUseCase(prismaEventRepository)

  return registerEvent
}