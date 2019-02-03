import { TodoListRepository } from "modules/todos/data/repositories/todo-list.repository";
import { TodoListUpdatedEvent } from "../implementations/todo-list-updated.event";
import { IEventHandler, EventsHandler } from "@nestjs/cqrs";

@EventsHandler(TodoListUpdatedEvent)
export class TodoListUpdatedHandler implements IEventHandler<TodoListUpdatedEvent> {
  constructor(private readonly repository: TodoListRepository) {}

  async handle(event: TodoListUpdatedEvent) {
    const { listId, title } = event;
    await this.repository.update(listId, title);
  }
}