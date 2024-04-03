import {
  makeRegisterEventService
} from "./chunk-TAUZJYQZ.mjs";

// src/http/routes/registerEvent.ts
import { z } from "zod";
async function registerEvent(app) {
  app.withTypeProvider().post(
    "/events",
    {
      schema: {
        summary: "Create an event",
        tags: ["Events"],
        body: z.object({
          title: z.string(),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable()
        }),
        response: {
          201: z.object({
            event: z.object({
              id: z.string(),
              title: z.string(),
              slug: z.string(),
              details: z.string().nullable(),
              maximumAttendees: z.number().int().positive().nullable()
            })
          })
        }
      }
    },
    async (request, reply) => {
      const { title, details, maximumAttendees } = request.body;
      const registerEvent2 = makeRegisterEventService();
      const { event } = await registerEvent2.execute({
        title,
        details,
        maximumAttendees
      });
      return reply.status(201).send({
        event
      });
    }
  );
}

export {
  registerEvent
};
