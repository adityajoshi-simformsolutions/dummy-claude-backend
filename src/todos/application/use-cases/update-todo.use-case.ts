import { Injectable, Inject } from '@nestjs/common';
import {
  ITodoRepository,
  TODO_REPOSITORY,
} from '../../domain/repositories/todo.repository.interface';
import { Todo } from '../../domain/entities/todo';
import { TodoStatus } from '../../domain/enums/todo-status.enum';
import { FindOneTodoUseCase } from './find-one-todo.use-case';

export interface UpdateTodoCommand {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: TodoStatus;
}

@Injectable()
export class UpdateTodoUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
    private readonly findOneTodoUseCase: FindOneTodoUseCase,
  ) {}

  async execute(id: string, command: UpdateTodoCommand): Promise<Todo> {
    const todo = await this.findOneTodoUseCase.execute(id);

    if (command.title !== undefined) todo.title = command.title;
    if (command.description !== undefined) todo.description = command.description;
    if (command.dueDate !== undefined) todo.dueDate = new Date(command.dueDate);
    if (command.status !== undefined) todo.status = command.status;

    return this.todoRepository.save(todo);
  }
}
