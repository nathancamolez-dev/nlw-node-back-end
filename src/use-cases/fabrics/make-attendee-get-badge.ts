
import { AttendeePrismaRepository } from "../../repositories/prisma/attendee-prisma-repository"
import { GetAttendeeBadgeUseCase } from "../get-badge-attendees"



export function makeGetAttendeeBadge() {

  const prismaAttendeeRepository = new AttendeePrismaRepository
  const getBadgeUseCase = new GetAttendeeBadgeUseCase(prismaAttendeeRepository)

  return getBadgeUseCase
}