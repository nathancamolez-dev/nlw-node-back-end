
import { AttendeeRepository, query } from "../repositories/attendee-repo";


interface attendeCountRequest{
    id: string;
    q:  string | null | undefined;
}

interface attendeCountResponse{
    total: number;
}

export class CountAttendeeUseCase {
    constructor(private AttendeesRepository: AttendeeRepository ) {}

    async execute({id , q} : attendeCountRequest): Promise<attendeCountResponse>{

        const total = await this.AttendeesRepository.countEventAttendees(id,{q})
        
        return {
            total,
        }

}
}