import type { Event } from "./base";
import { Subjects } from "./subject";

export interface TicketCreatedEvent extends Event {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: string;
    userId: string;
  };
}

export interface TicketUpdatedEvent extends Event {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: string;
    userId: string;
  };
}
