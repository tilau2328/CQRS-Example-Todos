import { ITodoEvent } from "../i-todo.event";

export class TodoRemovedEvent implements ITodoEvent {
    type = "todo-removed";
    constructor(
        readonly listId: string,
        readonly todoId: string,
    ) {}
}