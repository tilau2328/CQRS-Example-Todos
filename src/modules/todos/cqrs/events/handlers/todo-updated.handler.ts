import { TodosRepository } from "modules/todos/data/repositories/todo.repository";
import { TodoUpdatedEvent } from "../implementations/todo-updated";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(TodoUpdatedEvent)
export class TodoUpdatedHandler implements IEventHandler<TodoUpdatedEvent> {
  constructor(private readonly repository: TodosRepository) {}

  async handle(event: TodoUpdatedEvent) {
    const { listId, todoId, title, completed } = event;
    await this.repository.update(listId, todoId, title, completed);
  }
}