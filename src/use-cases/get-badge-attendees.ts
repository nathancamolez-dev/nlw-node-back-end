
import { AttendeeRepository, getBadgeResponse } from "../repositories/attendee-repo";
import { BadRequest } from "../errors/BadRequest-error";

interface attendeeRequest{
    id: number;
}

interface attendeeResponse{
    attendee: getBadgeResponse
}

export class GetAttendeeBadgeUseCase {
    constructor(private AttendeesRepository: AttendeeRepository ) {}

    async execute({id} : attendeeRequest): Promise<attendeeResponse>{

        const attendeeBadge = await this.AttendeesRepository.getBadge(id)
        
        if(!attendeeBadge){
            throw new BadRequest('Attendee not found')
        }
        return {
            attendee: attendeeBadge,
        }

}
}