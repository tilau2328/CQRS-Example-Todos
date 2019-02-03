import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { UpdateTodoListCommand } from "../implementations/update-todo-list.command";
import { TodoEventRepository } from "modules/todos/data/repositories/todo-event.repository";

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler implements ICommandHandler<UpdateTodoListCommand> {
    constructor(
        private readonly repository: TodoEventRepository,
        private readonly publisher: EventPublisher,
    ) {}

  async execute(command: UpdateTodoListCommand, resolve: (value?) => void) {
    const { listId, title } = command;
    const todoList = this.publisher.mergeObjectContext(
        await this.repository.findById(listId)
    );
    todoList.update(title);
    await this.repository.persist(todoList);
    resolve();
  }
}