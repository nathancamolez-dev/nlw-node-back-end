import {
  BadRequest
} from "./chunk-L5JSDUOG.mjs";

// src/use-cases/get-event.ts
var GetEventUseCase = class {
  constructor(eventsRepository) {
    this.eventsRepository = eventsRepository;
  }
  async execute({ id }) {
    const event = await this.eventsRepository.getEvent({ id });
    if (!event) {
      throw new BadRequest("Event not found");
    }
    return {
      event
    };
  }
};

export {
  GetEventUseCase
};
