import { Param, Get, Controller, Body, Post, Delete, Patch } from "@nestjs/common";
import { UpdateTodoListRequest } from "./requests/update-todo-list.request";
import { CreateTodoListRequest } from "./requests/create-todo-list.request";
import { UpdateTodoRequest } from "./requests/update-todo.request";
import { TodoListService } from "../services/todo-list.service";
import { AddTodoRequest } from "./requests/add-todo.request";
import { TodosService } from "../services/todos.service";

@Controller('todos')
export class TodosController {
    constructor(
        private readonly todoListService: TodoListService,
        private readonly todosService: TodosService,
    ) {}
  
    @Get()
    async list() {
        return this.todoListService.list();
    }

    @Get(':listId')
    async find(@Param('listId') listId: string) {
        return this.todoListService.find(listId);
    }

    @Post()
    async createTodoList(@Body() { title }: CreateTodoListRequest) {
        return this.todoListService.create({ title });
    }

    @Patch(':listId')
    async updateTodoList(
        @Param('listId') listId: string, 
        @Body() { title }: UpdateTodoListRequest,
    ) {
        return this.todoListService.update(listId, { title });
    }

    @Post(':listId')
    async addTodo(
        @Param('listId') listId: string, 
        @Body() { title }: AddTodoRequest,
    ) {
        return this.todosService.create(listId, { title });
    }

    @Get(':listId/todos')
    async listTodos(@Param('listId') listId: string) {
        return this.todosService.list(listId);
    }

    @Patch(':listId/todos/:todoId')
    async updateTodo(
        @Param('listId') listId: string,
        @Param('todoId') todoId: string,
        @Body() { title, completed }: UpdateTodoRequest,
    ) {
        return this.todosService.update(listId, todoId, { title, completed });
    }

    @Delete(':listId/todos/:todoId')
    async removeTodo(
        @Param('listId') listId: string, 
        @Param('todoId') todoId: string,
    ) {
        return this.todosService.remove(listId, todoId);
    }
}