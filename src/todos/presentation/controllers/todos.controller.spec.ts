import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { CreateTodoUseCase } from '../../application/use-cases/create-todo.use-case';
import { FindAllTodosUseCase } from '../../application/use-cases/find-all-todos.use-case';
import { FindOneTodoUseCase } from '../../application/use-cases/find-one-todo.use-case';
import { UpdateTodoUseCase } from '../../application/use-cases/update-todo.use-case';
import { RemoveTodoUseCase } from '../../application/use-cases/remove-todo.use-case';
import { SoftDeleteTodoUseCase } from '../../application/use-cases/soft-delete-todo.use-case';
import { RestoreTodoUseCase } from '../../application/use-cases/restore-todo.use-case';

describe('TodosController', () => {
  let controller: TodosController;
  let restoreTodoUseCase: RestoreTodoUseCase;
  let softDeleteTodoUseCase: SoftDeleteTodoUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        { provide: CreateTodoUseCase, useValue: {} },
        { provide: FindAllTodosUseCase, useValue: {} },
        { provide: FindOneTodoUseCase, useValue: {} },
        { provide: UpdateTodoUseCase, useValue: {} },
        { provide: RemoveTodoUseCase, useValue: {} },
        { provide: SoftDeleteTodoUseCase, useValue: { execute: jest.fn() } },
        { provide: RestoreTodoUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    restoreTodoUseCase = module.get<RestoreTodoUseCase>(RestoreTodoUseCase);
    softDeleteTodoUseCase = module.get<SoftDeleteTodoUseCase>(SoftDeleteTodoUseCase);
  });

  it('should restore a todo', async () => {
    const todo = { id: '1', title: 'test', deletedAt: null };
    jest.spyOn(restoreTodoUseCase, 'execute').mockResolvedValue(todo as any);
    const result = await controller.restore('1');
    expect(result).toEqual(todo);
  });

  it('should return 404 if restore not found', async () => {
    jest.spyOn(restoreTodoUseCase, 'execute').mockResolvedValue(null);
    const result = await controller.restore('1');
    expect(result).toEqual({ statusCode: 404, message: 'Todo not found' });
  });

  it('should soft delete a todo', async () => {
    const todo = { id: '1', title: 'test', deletedAt: new Date() };
    jest.spyOn(softDeleteTodoUseCase, 'execute').mockResolvedValue(todo as any);
    const result = await controller.softDelete('1');
    expect(result).toEqual(todo);
  });

  it('should return 404 if soft delete not found', async () => {
    jest.spyOn(softDeleteTodoUseCase, 'execute').mockResolvedValue(null);
    const result = await controller.softDelete('1');
    expect(result).toEqual({ statusCode: 404, message: 'Todo not found' });
  });
});
