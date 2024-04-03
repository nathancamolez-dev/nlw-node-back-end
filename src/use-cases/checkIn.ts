
import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "../repositories/checkIn-repo";
import { BadRequest } from "../errors/BadRequest-error";



interface checkInRequest{
  id: number;
}

interface checkInResponse {
    checkIn: CheckIn
}

export class RegistercheckInsUseCase {
    constructor(private checkInsRepository: CheckInRepository ) {}

    async execute({ id } : checkInRequest): Promise<checkInResponse>{
       
        const checkedIn = await this.checkInsRepository.getcheckIn(id);
        
        if(checkedIn !== null){
            throw new BadRequest('Already checked in')
        }

        const checkIn = await this.checkInsRepository.register(id)

        return {
            checkIn,
        }

}
}