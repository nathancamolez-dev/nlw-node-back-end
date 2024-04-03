import { Prisma } from "@prisma/client";
import { EventsRepository, getEventSchema } from "../event-repo";
import { prisma } from "../../lib/prisma";

export class EventsPrismaRepo implements EventsRepository{

  async getMaximumAttendees({id}: getEventSchema){
    const event = await prisma.event.findFirst({where:{ id}})
     
    if (!event){
        return null
    }

        return event.maximumAttendees
    }
  async getEvent({id}: getEventSchema){
       const event = await prisma.event.findFirst({select:{
        id:true,
        title:true,
        slug:true,
        details:true,
        maximumAttendees:true,
        _count:{
            select:
            {
                attendees:true
            }
        },
       },
        where:{ id}})


       return event 
   }
   async eventWithSameSlug(slug: string){
    const event = await prisma.event.findUnique({where:{ slug }})


    return event 
}



   async register(data: Prisma.EventUncheckedCreateInput){
        const event = await prisma.event.create({data})
        return event
    }

}