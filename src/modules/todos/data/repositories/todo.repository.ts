import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Todo } from "../interfaces/todo.interface";

@Injectable()
export class TodosRepository {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

    async list(listId: string): Promise<Todo[]> {
        return await this.todoModel.find({ listId });
    }
    
    async find(listId: string, todoId: string): Promise<Todo>  {
        return await this.todoModel.findOne({ listId, todoId });
    }

    async create(listId: string, todoId: string, title: string): Promise<Todo> {
        return await new this.todoModel({ listId, todoId, title }).save();
    }
    
    async update(listId: string, todoId: string, title?: string, completed?: boolean): Promise<Todo>  {
        let todo = await this.find(listId, todoId);
        if(title !== null)
            todo.title = title;
        if(completed !== null)
            todo.completed = completed;
        return await todo.save();
    }

    async remove(listId: string, todoId: string): Promise<Todo> {
        return this.todoModel.findOneAndDelete({ listId, todoId });
    }
}