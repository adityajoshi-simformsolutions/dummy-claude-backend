import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ITodoRepository } from '../../domain/repositories/todo.repository.interface';
import { Todo } from '../../domain/entities/todo';
import { TodoStatus } from '../../domain/enums/todo-status.enum';
import { TodoOrmEntity } from '../orm/todo.orm-entity';

@Injectable()
export class TodoTypeOrmRepository implements ITodoRepository {
  constructor(
    @InjectRepository(TodoOrmEntity)
    private readonly ormRepo: MongoRepository<TodoOrmEntity>,
  ) {}

  async create(data: Partial<Todo>): Promise<Todo> {
    const entity = this.ormRepo.create(data as Partial<TodoOrmEntity>);
    const saved = await this.ormRepo.save(entity);
    return this.toTodo(saved);
  }

  async findAll(status?: TodoStatus): Promise<Todo[]> {
    const where: any = status ? { status } : {};
    where.deletedAt = null;
    const entities = await this.ormRepo.findBy(where);
    return entities.map((e) => this.toTodo(e));
  }

  async findById(id: string): Promise<Todo | null> {
    const entity = await this.ormRepo.findOneBy({
      _id: new ObjectId(id),
      deletedAt: null,
    } as any);
    return entity ? this.toTodo(entity) : null;
  }

  async save(todo: Todo): Promise<Todo> {
    const entity = this.ormRepo.create(todo as unknown as Partial<TodoOrmEntity>);
    const saved = await this.ormRepo.save(entity);
    return this.toTodo(saved);
  }

  async softDelete(id: string): Promise<Todo | null> {
    const entity = await this.ormRepo.findOneBy({ _id: new ObjectId(id) } as any);
    if (!entity) return null;
    entity.deletedAt = new Date();
    const saved = await this.ormRepo.save(entity);
    return this.toTodo(saved);
  }

  async remove(todo: Todo): Promise<void> {
    const entity = this.ormRepo.create(todo as unknown as Partial<TodoOrmEntity>);
    await this.ormRepo.remove(entity);
  }

  private toTodo(entity: TodoOrmEntity): Todo {
    const todo = new Todo();
    todo.id = entity.id;
    todo.title = entity.title;
    todo.description = entity.description;
    todo.dueDate = entity.dueDate;
    todo.status = entity.status;
    todo.createdAt = entity.createdAt;
    todo.updatedAt = entity.updatedAt;
    todo.deletedAt = entity.deletedAt ?? null;
    return todo;
  }
}
