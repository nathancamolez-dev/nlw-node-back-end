import {  CheckIn  } from '@prisma/client'



export interface CheckInRepository {
getcheckIn(id: number):Promise< CheckIn | null >
register(id: number): Promise< CheckIn >
}