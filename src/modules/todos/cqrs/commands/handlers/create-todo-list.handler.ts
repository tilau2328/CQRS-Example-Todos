import * as uuid from "uuid";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { CreateTodoListCommand } from "../implementations/create-todo-list.command";
import { TodoEventRepository } from "modules/todos/data/repositories/todo-event.repository";

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
    constructor(
      private readonly repository: TodoEventRepository,
      private readonly publisher: EventPublisher,
    ) {}

  async execute(command: CreateTodoListCommand, resolve: (value?) => void) {
    const { title } = command;
    const todoList = this.publisher.mergeObjectContext(
      await this.repository.create()
    );
    const listId = uuid.v4();
    todoList.init(listId, title);
    await this.repository.persist(todoList);
    resolve();
  }
}