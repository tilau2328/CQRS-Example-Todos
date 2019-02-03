import { ITodoCommand } from "../i-todo.command";

export class CreateTodoListCommand implements ITodoCommand {
    type = "create-todo-list";
    constructor(
        readonly title: string,
    ) {}
}