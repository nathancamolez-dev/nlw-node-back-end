import { prisma } from "../../lib/prisma";
import { CheckInRepository } from "../checkIn-repo";

export class CheckInPrismaRepository implements CheckInRepository{
    async register(id: number){
        const checkIn = await prisma.checkIn.create({
            data:{
                attendeeId: id,
            }
        })
        return checkIn
    }
    async getcheckIn(id: number){
        const checkedIn = await prisma.checkIn.findUnique({where:{attendeeId:id}})


        return checkedIn
    }

}