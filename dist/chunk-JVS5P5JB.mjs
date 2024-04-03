import {
  makeRegisterAttendeeUseCase
} from "./chunk-X2HE46YN.mjs";

// src/http/routes/registerUser.ts
import { z } from "zod";
async function registerUser(app) {
  app.withTypeProvider().post("/events/:eventId/attendees", {
    schema: {
      summary: "Register Attendee",
      tags: ["Attendees"],
      body: z.object({
        name: z.string(),
        email: z.string().email()
      }),
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        201: z.object({
          attendeeId: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const { name, email } = request.body;
    const registerUser2 = makeRegisterAttendeeUseCase();
    const { attendeeId } = await registerUser2.execute({
      name,
      email,
      eventId
    });
    return reply.status(201).send({
      attendeeId
    });
  });
}

export {
  registerUser
};
