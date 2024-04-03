import {
  BadRequest
} from "./chunk-L5JSDUOG.mjs";

// src/use-cases/get-badge-attendees.ts
var GetAttendeeBadgeUseCase = class {
  constructor(AttendeesRepository) {
    this.AttendeesRepository = AttendeesRepository;
  }
  async execute({ id }) {
    const attendeeBadge = await this.AttendeesRepository.getBadge(id);
    if (!attendeeBadge) {
      throw new BadRequest("Attendee not found");
    }
    return {
      attendee: attendeeBadge
    };
  }
};

export {
  GetAttendeeBadgeUseCase
};
