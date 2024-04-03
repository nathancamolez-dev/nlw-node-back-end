import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {  z } from "zod";
import { makeRegisterEventService } from "../../use-cases/fabrics/make-event-register";

export async function registerEvent(app: FastifyInstance){

    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events',{
        schema: {
            summary: 'Create an event',
            tags: ['Events'],
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
        },
       
    }
    , async (request,reply) => {
        const { title , details , maximumAttendees } = request.body

const registerEvent = makeRegisterEventService()

const { event } = await registerEvent.execute({
    title,
    details,
    maximumAttendees
})

return reply.status(201).send({
    event,
})
    })




    
}