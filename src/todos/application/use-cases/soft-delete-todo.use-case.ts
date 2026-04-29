import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITodoRepository, TODO_REPOSITORY } from '../../domain/repositories/todo.repository.interface';
import { Todo } from '../../domain/entities/todo';
import { FindOneTodoUseCase } from './find-one-todo.use-case';

@Injectable()
export class SoftDeleteTodoUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
    private readonly findOneTodoUseCase: FindOneTodoUseCase,
  ) {}

  async execute(id: string): Promise<Todo> {
    const todo = await this.findOneTodoUseCase.execute(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    todo.deletedAt = new Date();
    return this.todoRepository.save(todo);
  }
}
