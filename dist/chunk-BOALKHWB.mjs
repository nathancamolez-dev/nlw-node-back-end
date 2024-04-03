import {
  makeGetEvent
} from "./chunk-JVETVXOH.mjs";

// src/http/routes/get-event.ts
import { z } from "zod";
async function getEvent(app) {
  app.withTypeProvider().get(
    "/events/:id",
    {
      schema: {
        summary: "Show event",
        tags: ["Events"],
        params: z.object({ id: z.string().uuid() }),
        response: {
          200: z.object({
            event: z.object({
              id: z.string(),
              title: z.string(),
              slug: z.string(),
              details: z.string().nullable(),
              maximumAttendees: z.number().int().positive().nullable(),
              AttendeesAmount: z.number().int().positive()
            })
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const getEvent2 = makeGetEvent();
      const { event } = await getEvent2.execute({
        id
      });
      return reply.status(200).send({
        event: {
          ...event,
          AttendeesAmount: event._count.attendees
        }
      });
    }
  );
}

export {
  getEvent
};
