import {
  EventsPrismaRepo
} from "./chunk-OA4VNMSY.mjs";
import {
  RegisterEventsUseCase
} from "./chunk-ULFC6MGC.mjs";

// src/use-cases/fabrics/make-event-register.ts
function makeRegisterEventService() {
  const prismaEventRepository = new EventsPrismaRepo();
  const registerEvent = new RegisterEventsUseCase(prismaEventRepository);
  return registerEvent;
}

export {
  makeRegisterEventService
};
