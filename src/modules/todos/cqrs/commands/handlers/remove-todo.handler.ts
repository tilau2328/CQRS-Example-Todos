import { RemoveTodoCommand } from "../implementations/remove-todo.command";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { TodoEventRepository } from "modules/todos/data/repositories/todo-event.repository";

@CommandHandler(RemoveTodoCommand)
export class RemoveTodoHandler implements ICommandHandler<RemoveTodoCommand> {
    constructor(
      private readonly repository: TodoEventRepository,
      private readonly publisher: EventPublisher,
    ) {}

  async execute(command: RemoveTodoCommand, resolve: (value?) => void) {
    const { listId, todoId } = command;
    const todoList = this.publisher.mergeObjectContext(
      await this.repository.findById(listId)
    );
    todoList.removeTodo(todoId);
    await this.repository.persist(todoList);
    resolve();
  }
}