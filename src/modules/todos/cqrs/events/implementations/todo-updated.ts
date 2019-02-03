import { ITodoEvent } from "../i-todo.event";

export class TodoUpdatedEvent implements ITodoEvent {
    type = "todo-updated";
    constructor(
        readonly listId: string,
        readonly todoId: string,
        readonly title?: string, 
        readonly completed?: boolean,
    ) {}
}