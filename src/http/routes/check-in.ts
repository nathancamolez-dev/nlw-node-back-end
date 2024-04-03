import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { request } from "http";
import z from "zod";
import { makeRegisterCheckInUseCase } from "../../use-cases/fabrics/make-checkIn-register";

export async function checkIn (app: FastifyInstance){
    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendees/:attendeeId/check-in',{
        schema:{
            summary: 'Check-in Attendee',
            tags: ['Check-in'],
            params: z.object({
                attendeeId: z.coerce.number().int()
            })
        }
    }, async (request,reply) => { 
        const { attendeeId } = request.params;

        const register = makeRegisterCheckInUseCase()

        const { checkIn } = await register.execute( {
            id:attendeeId
        } )

        return reply.status(201).send()

     } )
}