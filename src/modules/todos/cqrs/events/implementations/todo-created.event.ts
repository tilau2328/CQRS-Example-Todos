import { ITodoEvent } from "../i-todo.event";

export class TodoCreatedEvent implements ITodoEvent {
    type = "todo-created";
    constructor(
        readonly listId: string,
        readonly todoId: string,
        readonly title: string, 
    ) {}
}