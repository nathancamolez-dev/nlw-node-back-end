import {
  BadRequest
} from "./chunk-L5JSDUOG.mjs";

// src/use-cases/register-user.ts
var RegisterAttendeeUseCase = class {
  constructor(AttendeeRepository, EventRepository) {
    this.AttendeeRepository = AttendeeRepository;
    this.EventRepository = EventRepository;
  }
  async execute({ name, email, eventId }) {
    const event = await this.EventRepository.getEvent({
      id: eventId
    });
    if (!event) {
      throw new BadRequest("Event not found");
    }
    const result = await Promise.all([
      this.EventRepository.getMaximumAttendees({ id: eventId }),
      this.AttendeeRepository.attendeeRegistered(eventId)
    ]);
    if (result[0] !== null && result[0] <= result[1]) {
      throw new BadRequest("Maximum number of attendees reached");
    }
    const attendeeOnEvent = await this.AttendeeRepository.uniqueEmailAndEvent({ email, eventId });
    if (attendeeOnEvent !== null) {
      throw new BadRequest("Email already registered");
    }
    const attendeeId = await this.AttendeeRepository.register({
      name,
      email,
      eventId
    });
    return {
      attendeeId
    };
  }
};

export {
  RegisterAttendeeUseCase
};
