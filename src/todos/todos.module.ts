import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoOrmEntity } from './infrastructure/orm/todo.orm-entity';
import { TodoTypeOrmRepository } from './infrastructure/repositories/todo.typeorm.repository';
import { TODO_REPOSITORY } from './domain/repositories/todo.repository.interface';
import { CreateTodoUseCase } from './application/use-cases/create-todo.use-case';
import { FindAllTodosUseCase } from './application/use-cases/find-all-todos.use-case';
import { FindOneTodoUseCase } from './application/use-cases/find-one-todo.use-case';
import { UpdateTodoUseCase } from './application/use-cases/update-todo.use-case';
import { RemoveTodoUseCase } from './application/use-cases/remove-todo.use-case';
import { SoftDeleteTodoUseCase } from './application/use-cases/soft-delete-todo.use-case';
import { TodosController } from './presentation/controllers/todos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TodoOrmEntity])],
  controllers: [TodosController],
  providers: [
    {
      provide: TODO_REPOSITORY,
      useClass: TodoTypeOrmRepository,
    },
    CreateTodoUseCase,
    FindAllTodosUseCase,
    FindOneTodoUseCase,
    UpdateTodoUseCase,
    RemoveTodoUseCase,
    SoftDeleteTodoUseCase,
  ],
})
export class TodosModule {}
