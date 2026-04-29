import { Injectable, Inject } from '@nestjs/common';
import {
  ITodoRepository,
  TODO_REPOSITORY,
} from '../../domain/repositories/todo.repository.interface';
import { Todo } from '../../domain/entities/todo';
import { TodoStatus } from '../../domain/enums/todo-status.enum';

@Injectable()
export class FindAllTodosUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
  ) {}

  async execute(status?: TodoStatus): Promise<Todo[]> {
    return this.todoRepository.findAll(status);
  }
}
