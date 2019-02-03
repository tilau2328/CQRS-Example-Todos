import { ITodoEvent } from "../i-todo.event";

export class TodoListCreatedEvent implements ITodoEvent {
    type = "todo-list-created";
    constructor(
        readonly listId: string,
        readonly title: string, 
    ) {}
}