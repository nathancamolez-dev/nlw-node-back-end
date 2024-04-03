import { Prisma, Event } from '@prisma/client'
export interface getEventSchema {
    id: string;
}

export interface EventSchema {
    id: string;
    title: string;
    details: string | null;
    slug: string;
    maximumAttendees: number | null;
    _count: {
        attendees: number;
    };
}





export interface EventsRepository {
register(data: Prisma.EventUncheckedCreateInput): Promise<Event>
getEvent(id: getEventSchema): Promise<EventSchema |null >
eventWithSameSlug(slug: string): Promise<Event | null>
getMaximumAttendees(id: getEventSchema): Promise<number| null>

}