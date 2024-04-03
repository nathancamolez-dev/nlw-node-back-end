import {
  BadRequest
} from "./chunk-L5JSDUOG.mjs";

// src/use-cases/getEventAttendees.ts
var GetEventAttendeesUseCase = class {
  constructor(eventsRepository, AttendeeRepository) {
    this.eventsRepository = eventsRepository;
    this.AttendeeRepository = AttendeeRepository;
  }
  async execute({ id, pg, q }) {
    const event = await this.eventsRepository.getEvent({ id });
    if (!event) {
      throw new BadRequest("Event not found");
    }
    const attendees = await this.AttendeeRepository.getAllAttendees(id, pg, { q });
    console.log(attendees);
    return {
      attendees
    };
  }
};

export {
  GetEventAttendeesUseCase
};
