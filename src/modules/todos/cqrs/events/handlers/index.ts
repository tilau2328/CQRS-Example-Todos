import { TodoListCreatedHandler } from "./todo-list-created.handler";
import { TodoListUpdatedHandler } from "./todo-list-updated.handler";
import { TodoCreatedHandler } from "./todo-created.handler";
import { TodoUpdatedHandler } from "./todo-updated.handler";
import { TodoRemovedHandler } from "./todo-removed.handler";

export const EventHandlers = [TodoListCreatedHandler, TodoListUpdatedHandler, TodoCreatedHandler, TodoUpdatedHandler, TodoRemovedHandler];