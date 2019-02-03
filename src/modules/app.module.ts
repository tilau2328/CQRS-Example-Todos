import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/todos', { 
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    TodosModule,
  ],
})
export class AppModule {}
