import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import {
  ITodoRepository,
  TODO_REPOSITORY,
} from '../../domain/repositories/todo.repository.interface';
import { Todo } from '../../domain/entities/todo';

@Injectable()
export class FindOneTodoUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
  ) {}

  async execute(id: string): Promise<Todo> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException(`"${id}" is not a valid todo id`);
    }

    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    return todo;
  }
}
