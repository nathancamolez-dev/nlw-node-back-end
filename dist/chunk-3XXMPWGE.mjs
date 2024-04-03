import {
  makeCountAttendee
} from "./chunk-7CW3ZYWA.mjs";
import {
  makeGetEventAttendeesUseCase
} from "./chunk-AN3SULAT.mjs";

// src/http/routes/getEventAttendees.ts
import { z } from "zod";
async function getEventAttendees(app) {
  app.withTypeProvider().get(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Show event attendees",
        tags: ["Events"],
        params: z.object({ eventId: z.string().uuid() }),
        querystring: z.object({
          query: z.string().nullish(),
          pageIndex: z.string().nullable().default("0").transform(Number)
        }),
        response: {
          200: z.object({
            attendees: z.array(z.object({
              id: z.number(),
              name: z.string(),
              email: z.string(),
              createdAt: z.date(),
              checkInAt: z.date().nullable()
            })),
            total: z.number()
          })
        }
      }
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { pageIndex, query } = request.query;
      const getEventAttendees2 = makeGetEventAttendeesUseCase();
      const getTotal = makeCountAttendee();
      const [{ attendees }, { total }] = await Promise.all([
        getEventAttendees2.execute({
          id: eventId,
          pg: pageIndex,
          q: query
        }),
        getTotal.execute({
          id: eventId,
          q: query
        })
      ]);
      return reply.status(200).send({
        attendees: attendees.map((attendee) => {
          return {
            id: attendee.id,
            name: attendee.name,
            email: attendee.email,
            createdAt: attendee.createdAt,
            checkInAt: attendee.checkInAt
          };
        }),
        total
      });
    }
  );
}

export {
  getEventAttendees
};
