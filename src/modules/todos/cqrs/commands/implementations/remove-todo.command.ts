import { ITodoCommand } from "../i-todo.command";

export class RemoveTodoCommand implements ITodoCommand {
    type = "remove-todo";
    constructor(
        readonly listId: string,
        readonly todoId: string,
    ) {}
}