import { UpdateTodoCommand } from "../implementations/update-todo.command";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TodoEventRepository } from "modules/todos/data/repositories/todo-event.repository";

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
    constructor(
        private readonly repository: TodoEventRepository,
        private readonly publisher: EventPublisher,
    ) {}

  async execute(command: UpdateTodoCommand, resolve: (value?) => void) {
    const { listId, todoId, title, completed } = command;
    const todoList = this.publisher.mergeObjectContext(
        await this.repository.findById(listId)
    );
    todoList.updateTodo(todoId, title, completed);
    await this.repository.persist(todoList);
    resolve();
  }
}