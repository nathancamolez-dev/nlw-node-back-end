// src/use-cases/countAttendee.ts
var CountAttendeeUseCase = class {
  constructor(AttendeesRepository) {
    this.AttendeesRepository = AttendeesRepository;
  }
  async execute({ id, q }) {
    const total = await this.AttendeesRepository.countEventAttendees(id, { q });
    return {
      total
    };
  }
};

export {
  CountAttendeeUseCase
};
