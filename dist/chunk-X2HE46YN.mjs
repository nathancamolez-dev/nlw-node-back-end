import {
  EventsPrismaRepo
} from "./chunk-OA4VNMSY.mjs";
import {
  AttendeePrismaRepository
} from "./chunk-XOCKOMAH.mjs";
import {
  RegisterAttendeeUseCase
} from "./chunk-TI4DUQKY.mjs";

// src/use-cases/fabrics/make-attendee-register.ts
function makeRegisterAttendeeUseCase() {
  const prismaEventRepository = new EventsPrismaRepo();
  const prismaAttendeeRepository = new AttendeePrismaRepository();
  const registerAttendee = new RegisterAttendeeUseCase(prismaAttendeeRepository, prismaEventRepository);
  return registerAttendee;
}

export {
  makeRegisterAttendeeUseCase
};
