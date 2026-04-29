import { Injectable, Inject } from '@nestjs/common';
import {
  ITodoRepository,
  TODO_REPOSITORY,
} from '../../domain/repositories/todo.repository.interface';
import { FindOneTodoUseCase } from './find-one-todo.use-case';

@Injectable()
export class RemoveTodoUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
    private readonly findOneTodoUseCase: FindOneTodoUseCase,
  ) {}

  async execute(id: string): Promise<void> {
    const todo = await this.findOneTodoUseCase.execute(id);
    await this.todoRepository.remove(todo);
  }
}
