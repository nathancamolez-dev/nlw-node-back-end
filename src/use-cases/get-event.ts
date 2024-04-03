import { BadRequest } from "../errors/BadRequest-error";
import { EventSchema, EventsRepository } from "../repositories/event-repo";


interface eventRequest{
    id: string;
}

interface eventResponse{
    event : EventSchema
}

export class GetEventUseCase {
    constructor(private eventsRepository: EventsRepository ) {}

    async execute({id} : eventRequest): Promise<eventResponse>{

        const event = await this.eventsRepository.getEvent({id})
        
        if(!event){
            throw new BadRequest('Event not found')
        }
        return {
            event,
        }

}
}