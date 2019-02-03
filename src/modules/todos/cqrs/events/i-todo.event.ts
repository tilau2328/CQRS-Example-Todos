import { IEvent } from "@nestjs/cqrs";

export interface ITodoEvent extends IEvent {
    type: string;
}