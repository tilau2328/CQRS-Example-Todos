import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Todo } from "../interfaces/todo.interface";
import { TodoList } from "../interfaces/todo-list.interface";

@Injectable()
export class TodoListRepository {
    constructor(@InjectModel('TodoList') private readonly todoListModel: Model<TodoList>) {}

    async list(): Promise<TodoList[]> {
        return await this.todoListModel.find();
    }
    
    async find(listId: string): Promise<TodoList>  {
        return await this.todoListModel.findOne({ listId });
    }

    async create(listId: string, title: string): Promise<TodoList> {
        return await new this.todoListModel({ listId, title }).save();
    }
    
    async update(listId: string, title: string): Promise<TodoList> {
        let todoList = await this.find(listId);
        todoList.title = title;
        return todoList.save();
    }
}