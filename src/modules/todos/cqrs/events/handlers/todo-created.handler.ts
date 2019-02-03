import { TodosRepository } from "modules/todos/data/repositories/todo.repository";
import { TodoCreatedEvent } from "../implementations/todo-created.event";
import { IEventHandler, EventsHandler } from "@nestjs/cqrs";

@EventsHandler(TodoCreatedEvent)
export class TodoCreatedHandler implements IEventHandler<TodoCreatedEvent> {
  constructor(private readonly repository: TodosRepository) {}

  async handle(event: TodoCreatedEvent) {
    const { listId, todoId, title } = event;
    await this.repository.create(listId, todoId, title);
  }
}