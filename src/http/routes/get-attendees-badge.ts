import { FastifyInstance,  } from "fastify";
import { z } from "zod";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeGetAttendeeBadge } from "../../use-cases/fabrics/make-attendee-get-badge";

export async function getAttendeeBadge (app: FastifyInstance) {

  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/attendees/:id/badge',{
      schema: {
        summary: 'Show Attendee badge',
            tags: ['Attendees'],
          params: z.object({ id: z.coerce.number().int() }),
          response: { 
            200: z.object({ 
              badge: z.object({
                  name: z.string(),
                  email: z.string(),
                  event: z.string(),
                  checkInUrl: z.string(),
                })
              })
            },
         }
    }
  , async (request,reply) => {
    
    
 

const { id } = request.params


const getBadge = makeGetAttendeeBadge()

const  {attendee}  = await getBadge.execute({
  id
})


const  baseUrl = `${request.protocol}://${request.hostname}`

const checkInUrl = new URL(`/attendees/${id}/check-in`, baseUrl)

return reply.status(200).send({
  badge: {
    ...attendee,
     event: attendee.event.title,
     checkInUrl: checkInUrl.toString(),
  }   
})

  })



}