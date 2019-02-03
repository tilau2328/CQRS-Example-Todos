import { AggregateRoot, IEvent } from "@nestjs/cqrs";
import { TodoRemovedEvent } from "../events/implementations/todo-removed.event";
import { TodoListCreatedEvent } from "../events/implementations/todo-list-created.event";
import { TodoListUpdatedEvent } from "../events/implementations/todo-list-updated.event";
import { TodoUpdatedEvent } from "../events/implementations/todo-updated";
import { TodoCreatedEvent } from "../events/implementations/todo-created.event";

export class TodoListAggregate extends AggregateRoot {
    listId: string;
    title: string;
    todos = [];

    constructor() {
        super();
    }
    
    init(listId: string, title: string) {
        this.apply(new TodoListCreatedEvent(listId, title));
    }

    update(title: string) {
        this.apply(new TodoListUpdatedEvent(this.listId, title));
    }

    addTodo(todoId: string, title: string) {
        this.apply(new TodoCreatedEvent(this.listId, todoId, title));
    }

    updateTodo(todoId: string, title?: string, completed?: boolean) {
        this.apply(new TodoUpdatedEvent(this.listId, todoId, title, completed));
    }

    removeTodo(todoId: string) {
        this.apply(new TodoRemovedEvent(this.listId, todoId));
    }

    onTodoListCreatedEvent(event: IEvent) {
        const { listId, title } = <TodoListCreatedEvent> event;
        this.listId = listId;
        this.title = title;
    }

    onTodoListUpdatedEvent(event: IEvent) {
        const { title } = <TodoListUpdatedEvent> event;
        this.title = title;
    }

    onTodoCreatedEvent(event: IEvent) {
        const { todoId, title } = <TodoCreatedEvent> event;
        this.todos.push({ todoId, title });
    }

    onTodoUpdatedEvent(event: IEvent) {
        const { todoId, title, completed } = <TodoUpdatedEvent> event;
        const todo = this.todos.find((todo) => todo.todoId === todoId);
        if(todo !== null)
            todo.title = title;
        if(completed !== null)
            todo.completed = completed;
    }

    onTodoRemovedEvent(event: IEvent) {
        const { todoId } = <TodoRemovedEvent> event;
        const index = this.todos.findIndex((todo) => todo.todoId === todoId);
        this.todos.splice(index, 1);
    }
}