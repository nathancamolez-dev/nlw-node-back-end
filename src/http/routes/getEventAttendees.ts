import { FastifyInstance,  } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeGetEventAttendeesUseCase } from "../../use-cases/fabrics/make-getEventAttendees";
import { makeCountAttendee } from "../../use-cases/fabrics/make-attendee-count";

export async function getEventAttendees (app: FastifyInstance) {

  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/events/:eventId/attendees',{
      schema: {
        summary: 'Show event attendees',
            tags: ['Events'],
          params: z.object({ eventId: z.string().uuid() }),
          querystring: z.object({ 
            query: z.string().nullish(),
            pageIndex: z.string().nullable().default('0').transform(Number)
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
              total: z.number(),
            })
             
           
            
          }
              },
  }
  , async (request,reply) => {
    
    
    const {eventId} = request.params
    const { pageIndex , query } = request.query

    const getEventAttendees = makeGetEventAttendeesUseCase()
    const getTotal = makeCountAttendee()


    const [{attendees} , {total}] = await Promise.all([
       getEventAttendees.execute({
        id:eventId,
        pg: pageIndex,
        q: query,
    }),
    getTotal.execute({
        id:eventId,
        q: query,
    })

    ])
    
  

  return reply.status(200).send({
    attendees: attendees.map(attendee => {
          return {
            id: attendee.id,
            name: attendee.name,
            email: attendee.email,
            createdAt: attendee.createdAt,
            checkInAt : attendee.checkInAt,
          }
        }),
        total,
    
      })

  })
}