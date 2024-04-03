import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/repositories/prisma/events-prisma-repository.ts
var EventsPrismaRepo = class {
  async getMaximumAttendees({ id }) {
    const event = await prisma.event.findFirst({ where: { id } });
    if (!event) {
      return null;
    }
    return event.maximumAttendees;
  }
  async getEvent({ id }) {
    const event = await prisma.event.findFirst({
      select: {
        id: true,
        title: true,
        slug: true,
        details: true,
        maximumAttendees: true,
        _count: {
          select: {
            attendees: true
          }
        }
      },
      where: { id }
    });
    return event;
  }
  async eventWithSameSlug(slug) {
    const event = await prisma.event.findUnique({ where: { slug } });
    return event;
  }
  async register(data) {
    const event = await prisma.event.create({ data });
    return event;
  }
};

export {
  EventsPrismaRepo
};
