import { Todo } from '../entities/todo';
import { TodoStatus } from '../enums/todo-status.enum';

export const TODO_REPOSITORY = 'TODO_REPOSITORY';

export interface ITodoRepository {
  create(data: Partial<Todo>): Promise<Todo>;
  findAll(status?: TodoStatus): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  save(todo: Todo): Promise<Todo>;
  remove(todo: Todo): Promise<void>;
  softDelete(id: string): Promise<Todo | null>;
}
