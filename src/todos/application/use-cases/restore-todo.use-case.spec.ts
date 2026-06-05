import { RestoreTodoUseCase } from './restore-todo.use-case';

describe('RestoreTodoUseCase', () => {
  let useCase: RestoreTodoUseCase;
  let todoRepository: any;
  let findOneTodoUseCase: any;

  beforeEach(() => {
    todoRepository = { save: jest.fn() };
    findOneTodoUseCase = { execute: jest.fn() };
    useCase = new RestoreTodoUseCase(todoRepository, findOneTodoUseCase);
  });

  it('should restore a soft-deleted todo', async () => {
    const todo = { id: '1', deletedAt: new Date() };
    findOneTodoUseCase.execute.mockResolvedValue(todo);
    todoRepository.save.mockResolvedValue({ ...todo, deletedAt: null });
    const result = await useCase.execute('1');
    expect(result.deletedAt).toBeNull();
    expect(todoRepository.save).toHaveBeenCalledWith({ ...todo, deletedAt: null });
  });

  it('should throw if todo not found', async () => {
    findOneTodoUseCase.execute.mockResolvedValue(null);
    await expect(useCase.execute('1')).rejects.toThrow('Todo with id "1" not found');
  });
});
