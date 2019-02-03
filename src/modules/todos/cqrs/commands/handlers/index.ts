import { CreateTodoListHandler } from "./create-todo-list.handler";
import { UpdateTodoListHandler } from "./update-todo-list.handler";
import { UpdateTodoHandler } from "./update-todo.handler";
import { RemoveTodoHandler } from "./remove-todo.handler";
import { AddTodoHandler } from "./add-todo.handler";

export const CommandHandlers = [CreateTodoListHandler, UpdateTodoListHandler, AddTodoHandler, UpdateTodoHandler, RemoveTodoHandler];
    