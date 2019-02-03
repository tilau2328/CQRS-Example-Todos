import { TodosRepository } from "modules/todos/data/repositories/todo.repository";
import { TodoRemovedEvent } from "../implementations/todo-removed.event";
import { IEventHandler, EventsHandler } from "@nestjs/cqrs";

@EventsHandler(TodoRemovedEvent)
export class TodoRemovedHandler implements IEventHandler<TodoRemovedEvent> {
  constructor(private readonly repository: TodosRepository) {}

  async handle(event: TodoRemovedEvent) {
    const { listId, todoId } = event;
    await this.repository.remove(listId, todoId);
  }
}