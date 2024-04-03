import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/repositories/prisma/checkIn-prisma-repository.ts
var CheckInPrismaRepository = class {
  async register(id) {
    const checkIn = await prisma.checkIn.create({
      data: {
        attendeeId: id
      }
    });
    return checkIn;
  }
  async getcheckIn(id) {
    const checkedIn = await prisma.checkIn.findUnique({ where: { attendeeId: id } });
    return checkedIn;
  }
};

export {
  CheckInPrismaRepository
};
