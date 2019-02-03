import { ITodoCommand } from "../i-todo.command";

export class UpdateTodoListCommand implements ITodoCommand {
    type = "update-todo-list";
    constructor(
        readonly listId: string,
        readonly title: string,
    ) {}
}