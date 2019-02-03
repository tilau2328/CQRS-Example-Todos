import * as uuid from "uuid";
import { AddTodoCommand } from "../implementations/add-todo.command";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TodoEventRepository } from "modules/todos/data/repositories/todo-event.repository";

@CommandHandler(AddTodoCommand)
export class AddTodoHandler implements ICommandHandler<AddTodoCommand> {
    constructor(
        private readonly repository: TodoEventRepository,
        private readonly publisher: EventPublisher,
    ) {}

  async execute(command: AddTodoCommand, resolve: (value?) => void) {
    const { listId, title } = command;
    const todoList = this.publisher.mergeObjectContext(
        await this.repository.findById(listId)
    );
    const todoId = uuid.v4();
    todoList.addTodo(todoId, title);
    await this.repository.persist(todoList);
    resolve();
  }
}
