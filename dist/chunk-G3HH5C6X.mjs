import {
  makeRegisterCheckInUseCase
} from "./chunk-3VA4K6VE.mjs";

// src/http/routes/check-in.ts
import z from "zod";
async function checkIn(app) {
  app.withTypeProvider().get("/attendees/:attendeeId/check-in", {
    schema: {
      summary: "Check-in Attendee",
      tags: ["Check-in"],
      params: z.object({
        attendeeId: z.coerce.number().int()
      })
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params;
    const register = makeRegisterCheckInUseCase();
    const { checkIn: checkIn2 } = await register.execute({
      id: attendeeId
    });
    return reply.status(201).send();
  });
}

export {
  checkIn
};
