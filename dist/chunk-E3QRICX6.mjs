import {
  AttendeePrismaRepository
} from "./chunk-XOCKOMAH.mjs";
import {
  GetAttendeeBadgeUseCase
} from "./chunk-IV4ZLX52.mjs";

// src/use-cases/fabrics/make-attendee-get-badge.ts
function makeGetAttendeeBadge() {
  const prismaAttendeeRepository = new AttendeePrismaRepository();
  const getBadgeUseCase = new GetAttendeeBadgeUseCase(prismaAttendeeRepository);
  return getBadgeUseCase;
}

export {
  makeGetAttendeeBadge
};
