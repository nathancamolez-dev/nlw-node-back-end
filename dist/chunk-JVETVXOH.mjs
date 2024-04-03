import {
  EventsPrismaRepo
} from "./chunk-OA4VNMSY.mjs";
import {
  GetEventUseCase
} from "./chunk-RS7G3SEO.mjs";

// src/use-cases/fabrics/make-get-event.ts
function makeGetEvent() {
  const prismaEventRepository = new EventsPrismaRepo();
  const getEvent = new GetEventUseCase(prismaEventRepository);
  return getEvent;
}

export {
  makeGetEvent
};
