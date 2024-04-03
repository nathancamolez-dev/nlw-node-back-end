import {
  generateSlug
} from "./chunk-QIB4KJQR.mjs";
import {
  BadRequest
} from "./chunk-L5JSDUOG.mjs";

// src/use-cases/register-event.ts
var RegisterEventsUseCase = class {
  constructor(eventsRepository) {
    this.eventsRepository = eventsRepository;
  }
  async execute({ title, details, maximumAttendees }) {
    const slug = await generateSlug(title.toString());
    const sameslug = await this.eventsRepository.eventWithSameSlug(slug);
    if (sameslug !== null) {
      throw new BadRequest("Same unique slug");
    }
    const event = await this.eventsRepository.register({
      title,
      details,
      slug,
      maximumAttendees
    });
    return {
      event
    };
  }
};

export {
  RegisterEventsUseCase
};
