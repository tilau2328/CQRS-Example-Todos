import { ModuleRef } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { CommandBus, EventBus, CQRSModule } from "@nestjs/cqrs";
import { Module, OnModuleInit } from "@nestjs/common";
import { EventHandlers } from "./cqrs/events/handlers";
import { TodosService } from "./services/todos.service";
import { TodoSchema } from "./data/schemas/todo.schema";
import { CommandHandlers } from "./cqrs/commands/handlers";
import { TodoListService } from "./services/todo-list.service";
import { TodoListSchema } from "./data/schemas/todo-list.schema";
import { TodosController } from "./controllers/todos.controller";
import { TodoEventSchema } from "./data/schemas/todo-event.schema";
import { TodosRepository } from "./data/repositories/todo.repository";
import { TodoListRepository } from "./data/repositories/todo-list.repository";
import { TodoEventRepository } from "./data/repositories/todo-event.repository";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'TodoEvent', schema: TodoEventSchema }]),
      MongooseModule.forFeature([{ name: 'TodoList', schema: TodoListSchema }]),
      MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
      CQRSModule,
    ],
    controllers: [TodosController],
    providers: [
      TodosService,
      TodoListService,
      TodosRepository,
      ...EventHandlers,
      ...CommandHandlers,
      TodoListRepository,
      TodoEventRepository,
    ]
  })
  export class TodosModule implements OnModuleInit {
    constructor(
      private readonly moduleRef: ModuleRef,
      private readonly command$: CommandBus,
      private readonly event$: EventBus,
    ) {}
  
    onModuleInit() {
      this.command$.setModuleRef(this.moduleRef);
      this.event$.setModuleRef(this.moduleRef);
  
      this.event$.register(EventHandlers);
      this.command$.register(CommandHandlers);
    }
  }