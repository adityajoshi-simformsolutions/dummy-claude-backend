import { Injectable, Inject } from '@nestjs/common';
import {
  ITodoRepository,
  TODO_REPOSITORY,
} from '../../domain/repositories/todo.repository.interface';
import { Todo } from '../../domain/entities/todo';
import { TodoStatus } from '../../domain/enums/todo-status.enum';

export interface CreateTodoCommand {
  title: string;
  description?: string;
  dueDate: string;
  status?: TodoStatus;
}

@Injectable()
export class CreateTodoUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
  ) {}

  async execute(command: CreateTodoCommand): Promise<Todo> {
    return this.todoRepository.create({
      title: command.title,
      description: command.description,
      dueDate: new Date(command.dueDate),
      status: command.status ?? TodoStatus.PENDING,
    });
  }
}
