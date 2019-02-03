import { Model } from "mongoose";
import { IEvent } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TodoEvent } from "../interfaces/todo-event.interface";
import { ITodoEvent } from "modules/todos/cqrs/events/i-todo.event";
import { TodoListAggregate } from "modules/todos/cqrs/aggregates/todo-list.aggregate";
import { TodoCreatedEvent } from "modules/todos/cqrs/events/implementations/todo-created.event";
import { TodoUpdatedEvent } from "modules/todos/cqrs/events/implementations/todo-updated";
import { TodoRemovedEvent } from "modules/todos/cqrs/events/implementations/todo-removed.event";
import { TodoListCreatedEvent } from "modules/todos/cqrs/events/implementations/todo-list-created.event";
import { TodoListUpdatedEvent } from "modules/todos/cqrs/events/implementations/todo-list-updated.event";

@Injectable()
export class TodoEventRepository {
    constructor(@InjectModel('TodoEvent') private readonly entityModel: Model<TodoEvent>) {}
    
    async create(): Promise<TodoListAggregate> {
        return new TodoListAggregate();
    }

    async findById(id: string): Promise<TodoListAggregate> {
        const todoList = await this.create();
        const history = await this.getHistory(id);
        todoList.loadFromHistory(history);
        return todoList;
    }
    
    async persist(todoList: TodoListAggregate) {
        const events = todoList.getUncommittedEvents();
        await Promise.all(events.map(async (event: ITodoEvent) => 
            await this.storeEvent(todoList.listId, event)));
        todoList.commit();
    }

    private async getHistory(listId: string): Promise<IEvent[]> {
        const models = await this.entityModel.find({ listId });
        return models.map(this.eventFromModel);
    }

    private eventFromModel({ type, listId, payload }: TodoEvent): IEvent {
        let event: IEvent = null;
        let data = JSON.parse(payload);
        switch(type) {
            case "todo-list-created":
                event = new TodoListCreatedEvent(listId, data.title);
                break;
            case "todo-list-updated":
                event = new TodoListUpdatedEvent(listId, data.title);
                break;
            case "todo-created":
                event = new TodoCreatedEvent(listId, data.todoId, data.title);
                break;
            case "todo-updated":
                event = new TodoUpdatedEvent(listId, data.todoId, data.title);
                break;
            case "todo-removed":
                event = new TodoRemovedEvent(listId, data.todoId);
                break;
        }
        return event;
    }

    private async storeEvent(listId: string, event: ITodoEvent): Promise<TodoEvent> {
        const { type, ...remaining } = event;
        const payload = JSON.stringify(remaining);
        return await new this.entityModel({ listId, type, payload }).save();
    }
}