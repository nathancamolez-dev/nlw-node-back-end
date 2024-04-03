import {
  BadRequest
} from "./chunk-L5JSDUOG.mjs";

// src/use-cases/checkIn.ts
var RegistercheckInsUseCase = class {
  constructor(checkInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }
  async execute({ id }) {
    const checkedIn = await this.checkInsRepository.getcheckIn(id);
    if (checkedIn !== null) {
      throw new BadRequest("Already checked in");
    }
    const checkIn = await this.checkInsRepository.register(id);
    return {
      checkIn
    };
  }
};

export {
  RegistercheckInsUseCase
};
