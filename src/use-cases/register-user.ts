import { EventsRepository } from "../repositories/event-repo";
import { AttendeeRepository } from "../repositories/attendee-repo";
import { MIMEParams } from "util";
import { BadRequest } from "../errors/BadRequest-error";


interface userRequest{
    name: string
    email: string
    eventId: string
}

interface userResponse {
    attendeeId: number
}

export class RegisterAttendeeUseCase {
    constructor(private AttendeeRepository: AttendeeRepository,
        private EventRepository: EventsRepository ) {}

    async execute({ name , email, eventId} : userRequest): Promise<userResponse>{
        
        const event = await this.EventRepository.getEvent({
            id: eventId
        });
        
        if(!event){
            throw new BadRequest('Event not found')
        }

        const result = await Promise.all([
            this.EventRepository.getMaximumAttendees({id:eventId}),
            this.AttendeeRepository.attendeeRegistered(eventId)
        ])

        
      
       
        if ( result[0] !== null && result[0] <= result[1] ){
            throw new BadRequest('Maximum number of attendees reached')
            }   
        

        const attendeeOnEvent = await this.AttendeeRepository.uniqueEmailAndEvent({email, eventId})

        if(attendeeOnEvent !== null){
            throw new BadRequest('Email already registered')
        }

        const attendeeId = await this.AttendeeRepository.register({
            name,
            email,
            eventId
        })

        return {
            attendeeId,
        }

}
}