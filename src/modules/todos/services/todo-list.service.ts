import { CommandBus } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import { TodoList } from "../data/interfaces/todo-list.interface";
import { CreateTodoListDto } from "../data/dto/create-todo-list.dto";
import { UpdateTodoListDto } from "../data/dto/update-todo-list.dto";
import { TodoListRepository } from "../data/repositories/todo-list.repository";
import { UpdateTodoListCommand } from "../cqrs/commands/implementations/update-todo-list.command";
import { CreateTodoListCommand } from "../cqrs/commands/implementations/create-todo-list.command";

@Injectable()
export class TodoListService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly todoListRepository: TodoListRepository,
    ) {}
  
    async list(): Promise<TodoList[]> {
        return await this.todoListRepository.list();
    }

    async find(listId: string): Promise<TodoList> {
        return await this.todoListRepository.find(listId);
    }

    async create(createTodoDto: CreateTodoListDto) {
        const { title } = createTodoDto;
        return await this.commandBus.execute(new CreateTodoListCommand(title));
    }

    async update(listId: string, updateTodoListDto: UpdateTodoListDto) {
        const { title } = updateTodoListDto;
        return await this.commandBus.execute(new UpdateTodoListCommand(listId, title));
    }
}