import { FastifyInstance,  } from "fastify";
import { z } from "zod";
import { makeGetEvent } from "../../use-cases/fabrics/make-get-event";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function getEvent (app: FastifyInstance) {

  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/events/:id',{
      schema: {
        summary: 'Show event',
            tags: ['Events'],
          params: z.object({ id: z.string().uuid() }),
          response: {
            200: z.object({
                event: z.object({
                    id: z.string(),
                    title: z.string(),
                    slug: z.string(),
                    details: z.string().nullable(),
                    maximumAttendees: z.number().int().positive().nullable(),
                    AttendeesAmount:z.number().int().positive()
                                })
                         })
              
                     }
              },
  }
  , async (request,reply) => {
    
    
 

const { id } = request.params


const getEvent = makeGetEvent()

const  {event}  = await getEvent.execute({
  id
})
return reply.status(200).send({
    event:{
       ...event,
        AttendeesAmount:event._count.attendees
    }
})

  })



}