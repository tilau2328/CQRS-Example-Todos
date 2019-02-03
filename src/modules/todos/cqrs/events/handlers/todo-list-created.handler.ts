import { TodoListRepository } from "modules/todos/data/repositories/todo-list.repository";
import { TodoListCreatedEvent } from "../implementations/todo-list-created.event";
import { IEventHandler, EventsHandler } from "@nestjs/cqrs";

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedHandler implements IEventHandler<TodoListCreatedEvent> {
  constructor(private readonly repository: TodoListRepository) {}

  async handle(event: TodoListCreatedEvent) {
    const { listId, title } = event;
    await this.repository.create(listId, title);
  }
}