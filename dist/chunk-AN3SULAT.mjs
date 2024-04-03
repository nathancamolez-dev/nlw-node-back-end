import {
  EventsPrismaRepo
} from "./chunk-OA4VNMSY.mjs";
import {
  AttendeePrismaRepository
} from "./chunk-XOCKOMAH.mjs";
import {
  GetEventAttendeesUseCase
} from "./chunk-UVHGLLXE.mjs";

// src/use-cases/fabrics/make-getEventAttendees.ts
function makeGetEventAttendeesUseCase() {
  const prismaEventRepository = new EventsPrismaRepo();
  const prismaAttendeeRepository = new AttendeePrismaRepository();
  const getEventAttendees = new GetEventAttendeesUseCase(prismaEventRepository, prismaAttendeeRepository);
  return getEventAttendees;
}

export {
  makeGetEventAttendeesUseCase
};
