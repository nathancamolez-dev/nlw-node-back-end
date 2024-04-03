

import { AttendeePrismaRepository } from "../../repositories/prisma/attendee-prisma-repository"
import { CountAttendeeUseCase } from "../countAttendee"



export function makeCountAttendee() {
  const prismaAttendeeRepository = new AttendeePrismaRepository
  const CountAttendee = new CountAttendeeUseCase(prismaAttendeeRepository)

  return CountAttendee
}