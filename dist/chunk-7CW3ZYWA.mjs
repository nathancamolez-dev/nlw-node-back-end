import {
  AttendeePrismaRepository
} from "./chunk-XOCKOMAH.mjs";
import {
  CountAttendeeUseCase
} from "./chunk-DDU6IOYR.mjs";

// src/use-cases/fabrics/make-attendee-count.ts
function makeCountAttendee() {
  const prismaAttendeeRepository = new AttendeePrismaRepository();
  const CountAttendee = new CountAttendeeUseCase(prismaAttendeeRepository);
  return CountAttendee;
}

export {
  makeCountAttendee
};
