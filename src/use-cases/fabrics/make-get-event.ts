import { EventsPrismaRepo } from "../../repositories/prisma/events-prisma-repository"
import { GetEventUseCase } from "../get-event"

export function makeGetEvent() {
  const prismaEventRepository = new EventsPrismaRepo
  const getEvent = new GetEventUseCase(prismaEventRepository)

  return getEvent
}