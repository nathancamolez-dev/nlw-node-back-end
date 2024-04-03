import {  EventsRepository } from "../repositories/event-repo";
import { AttendeeRepository, AttendeeSchema } from "../repositories/attendee-repo";
import { BadRequest } from "../errors/BadRequest-error";

interface eventAttendeesRequest{
    id: string
    pg: number
    q: string | null | undefined
}

interface eventAttendeesResponse{
    attendees : AttendeeSchema[]
}

export class GetEventAttendeesUseCase {
    constructor(private eventsRepository: EventsRepository,
        private AttendeeRepository:  AttendeeRepository ) {}

    async execute({id, pg, q } :eventAttendeesRequest): Promise<eventAttendeesResponse>{

        const event = await this.eventsRepository.getEvent({id})
        
        if(!event){
            throw new BadRequest('Event not found')
        }

        const attendees = await this.AttendeeRepository.getAllAttendees(id, pg, {q})


        console.log(attendees)
        return {
            attendees: attendees,
        }



}
}