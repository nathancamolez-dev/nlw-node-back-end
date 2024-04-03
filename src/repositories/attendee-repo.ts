import {  Attendee, Prisma  } from '@prisma/client'

export interface findUniqueEmail{
    email: string;
    eventId: string;
}


export interface getBadgeResponse {
    name: string;
    email: string;
    event: {
        title: string;
    }

}

export interface AttendeeSchema{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    checkInAt : Date | null;
}
export interface  query {
    q: string | null | undefined
}

export interface AttendeeRepository {
register(data: Prisma.AttendeeUncheckedCreateInput): Promise< number >
uniqueEmailAndEvent(data: findUniqueEmail): Promise< Attendee | null>
attendeeRegistered(eventId: string): Promise< number>
getBadge(id: number): Promise<getBadgeResponse | null>
getAllAttendees(eventId: string,pg: number, q: query ): Promise< AttendeeSchema[]>
countEventAttendees(eventId: string, q: query): Promise<number>
}