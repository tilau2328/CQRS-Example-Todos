import { ITodoCommand } from "../i-todo.command";

export class AddTodoCommand implements ITodoCommand {
    type = "add-todo";
    constructor(
        readonly listId: string,
        readonly title: string,
    ) {}
}