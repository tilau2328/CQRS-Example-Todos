import { ITodoCommand } from "../i-todo.command";

export class UpdateTodoCommand implements ITodoCommand {
    type = "update-todo";
    constructor(
        readonly listId: string,
        readonly todoId: string,
        readonly title?: string,
        readonly completed?: boolean,
    ) {}
}