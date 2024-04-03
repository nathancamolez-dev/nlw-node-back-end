import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { request } from "http";
import { nativeEnum, z } from "zod";
import { makeRegisterAttendeeUseCase } from "../../use-cases/fabrics/make-attendee-register";
export async function registerUser (app: FastifyInstance){
    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events/:eventId/attendees',{
        schema:{
            summary: 'Register Attendee',
            tags: ['Attendees'],
            body: z.object({
                name: z.string(),
                email: z.string().email()

            }),
            params: z.object({
                eventId: z.string().uuid(),
            }),
            response:{
                201: z.object({
                    attendeeId: z.number(),
                        })
                }
            }
    }, async (request, reply) => {
        const {eventId} = request.params
        const {name ,email} = request.body



        const registerUser = makeRegisterAttendeeUseCase()

        const {attendeeId} = await registerUser.execute({
            name,
            email,
            eventId
        })

        return reply.status(201).send({
            attendeeId
        })

    })
}