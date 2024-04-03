
import { getEventAttendees } from "../../http/routes/getEventAttendees"
import { AttendeePrismaRepository } from "../../repositories/prisma/attendee-prisma-repository"
import { EventsPrismaRepo } from "../../repositories/prisma/events-prisma-repository"
import { GetEventAttendeesUseCase } from "../getEventAttendees"
import { RegisterAttendeeUseCase } from "../register-user"


export function makeGetEventAttendeesUseCase() {
  const prismaEventRepository = new EventsPrismaRepo
  const prismaAttendeeRepository = new AttendeePrismaRepository
  const getEventAttendees = new GetEventAttendeesUseCase(prismaEventRepository,prismaAttendeeRepository)

  return getEventAttendees
}