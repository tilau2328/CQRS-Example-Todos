import { CommandBus } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import { AddTodoDto } from "../data/dto/add-todo.dto";
import { UpdateTodoDto } from "../data/dto/update-todo.dto";
import { TodosRepository } from "../data/repositories/todo.repository";
import { AddTodoCommand } from "../cqrs/commands/implementations/add-todo.command";
import { UpdateTodoCommand } from "../cqrs/commands/implementations/update-todo.command";
import { RemoveTodoCommand } from "../cqrs/commands/implementations/remove-todo.command";

@Injectable()
export class TodosService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly todosRepository: TodosRepository,
    ) {}

    async list(listId: string) {
        return await this.todosRepository.list(listId);
    }

    async find(listId: string, todoId: string) {
        return await this.todosRepository.find(listId, todoId);
    }

    async create(listId: string, addTodoDto: AddTodoDto) {
        const { title } = addTodoDto;
        return await this.commandBus.execute(new AddTodoCommand(listId, title));
    }

    async update(listId: string, todoId: string, updateTodoDto: UpdateTodoDto) {
        const { title, completed } = updateTodoDto;
        if (title !== null || completed !== null) {
            return await this.commandBus.execute(new UpdateTodoCommand(listId, todoId, title, completed));
        }
    }

    async remove(listId: string, todoId: string) {
        return await this.commandBus.execute(new RemoveTodoCommand(listId, todoId));
    }
}