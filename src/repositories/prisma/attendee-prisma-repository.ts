import { Prisma } from "@prisma/client";
import { AttendeeRepository, findUniqueEmail, query } from "../attendee-repo";
import { prisma } from "../../lib/prisma";

export class AttendeePrismaRepository implements AttendeeRepository{
  async countEventAttendees(eventId: string, {q}: query){
    const total = await prisma.attendee.count({
      where: q? {
      eventId,
      name: {
        contains: q
      }
     } : {
        eventId
      }
    })
    return total
  }


  

  async getAllAttendees(eventId: string,pg: number, {q}: query){
    const attendeesRaw = await prisma.attendee.findMany({
      select:{
        id:true,
        name:true,
        email:true,
        createdAt:true,
        CheckIn: {
          select:{
            createdAt:true
          }
        }
        
      },where:q ? {
        eventId,
        name:{
          contains:q
        }
      } : {
      eventId,
    },
  take:10,
  skip: pg * 10,
  orderBy:{
    createdAt: "desc"
  }
 })

 const attendees = attendeesRaw.map(attendee => {
  return {
    id: attendee.id,
    name: attendee.name,
    email: attendee.email,
    createdAt: attendee.createdAt,
    checkInAt : attendee.CheckIn ? attendee.CheckIn.createdAt : null
  }})


  console.log(attendeesRaw)
    return attendees
  }

 async getBadge(id: number) {
    const attendee = await prisma.attendee.findUnique({select:
      {
        name: true,
        email: true,
        event:{
          select:{title: true}
        }
      },where:{
        id
    }})

    return attendee
  }
    async attendeeRegistered(eventId: string){
      const amountAttendee = await prisma.attendee.count({
        where: {
          eventId
        }
      })
      return amountAttendee
  }
  async uniqueEmailAndEvent(data: findUniqueEmail) {
     const attendee = await prisma.attendee.findUnique({where:{
        eventId_email:{
            email: data.email,
            eventId: data.eventId
        }
     }})
     return attendee
  }


  async register(data: Prisma.AttendeeUncheckedCreateInput){
        const attendee = await prisma.attendee.create({data})
        return attendee.id
    }

    

}