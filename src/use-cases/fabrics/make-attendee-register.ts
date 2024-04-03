
import { AttendeePrismaRepository } from "../../repositories/prisma/attendee-prisma-repository"
import { EventsPrismaRepo } from "../../repositories/prisma/events-prisma-repository"
import { RegisterAttendeeUseCase } from "../register-user"


export function makeRegisterAttendeeUseCase() {
  const prismaEventRepository = new EventsPrismaRepo
  const prismaAttendeeRepository = new AttendeePrismaRepository
  const registerAttendee = new RegisterAttendeeUseCase(prismaAttendeeRepository,prismaEventRepository)

  return registerAttendee
}