import { ITodoEvent } from "../i-todo.event";

export class TodoListUpdatedEvent implements ITodoEvent {
    type = "todo-list-updated";
    constructor(
        readonly listId: string,
        readonly title: string, 
    ) {}
}