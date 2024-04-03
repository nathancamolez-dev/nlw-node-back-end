import { EventsRepository } from "../repositories/event-repo";
import { Event } from "@prisma/client";
import { generateSlug } from "../utils/slug";
import { BadRequest } from "../errors/BadRequest-error";


interface eventRequest{
    title: string,
    details: string | null,
    maximumAttendees: number | null
}

interface eventResponse {
    event: Event
}

export class RegisterEventsUseCase {
    constructor(private eventsRepository: EventsRepository ) {}

    async execute({ title, details, maximumAttendees} : eventRequest): Promise<eventResponse>{
        const slug = await generateSlug(title.toString())
        
        const sameslug = await this.eventsRepository.eventWithSameSlug(slug)

        if(sameslug !== null){
            throw new BadRequest('Same unique slug')
        }

        const event = await this.eventsRepository.register({
            title,
            details,
            slug,
            maximumAttendees
        })

        return {
            event,
        }

}
}