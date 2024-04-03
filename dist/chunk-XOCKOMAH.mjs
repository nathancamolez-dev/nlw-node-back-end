import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/repositories/prisma/attendee-prisma-repository.ts
var AttendeePrismaRepository = class {
  async countEventAttendees(eventId, { q }) {
    const total = await prisma.attendee.count({
      where: q ? {
        eventId,
        name: {
          contains: q
        }
      } : {
        eventId
      }
    });
    return total;
  }
  async getAllAttendees(eventId, pg, { q }) {
    const attendeesRaw = await prisma.attendee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        CheckIn: {
          select: {
            createdAt: true
          }
        }
      },
      where: q ? {
        eventId,
        name: {
          contains: q
        }
      } : {
        eventId
      },
      take: 10,
      skip: pg * 10,
      orderBy: {
        createdAt: "desc"
      }
    });
    const attendees = attendeesRaw.map((attendee) => {
      return {
        id: attendee.id,
        name: attendee.name,
        email: attendee.email,
        createdAt: attendee.createdAt,
        checkInAt: attendee.CheckIn ? attendee.CheckIn.createdAt : null
      };
    });
    console.log(attendeesRaw);
    return attendees;
  }
  async getBadge(id) {
    const attendee = await prisma.attendee.findUnique({ select: {
      name: true,
      email: true,
      event: {
        select: { title: true }
      }
    }, where: {
      id
    } });
    return attendee;
  }
  async attendeeRegistered(eventId) {
    const amountAttendee = await prisma.attendee.count({
      where: {
        eventId
      }
    });
    return amountAttendee;
  }
  async uniqueEmailAndEvent(data) {
    const attendee = await prisma.attendee.findUnique({ where: {
      eventId_email: {
        email: data.email,
        eventId: data.eventId
      }
    } });
    return attendee;
  }
  async register(data) {
    const attendee = await prisma.attendee.create({ data });
    return attendee.id;
  }
};

export {
  AttendeePrismaRepository
};
