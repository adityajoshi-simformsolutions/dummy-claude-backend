import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoStatus } from '../../domain/enums/todo-status.enum';
import { CreateTodoUseCase } from '../../application/use-cases/create-todo.use-case';
import { FindAllTodosUseCase } from '../../application/use-cases/find-all-todos.use-case';
import { FindOneTodoUseCase } from '../../application/use-cases/find-one-todo.use-case';
import { UpdateTodoUseCase } from '../../application/use-cases/update-todo.use-case';
import { RemoveTodoUseCase } from '../../application/use-cases/remove-todo.use-case';

import { SoftDeleteTodoUseCase } from '../../application/use-cases/soft-delete-todo.use-case';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly findAllTodosUseCase: FindAllTodosUseCase,
    private readonly findOneTodoUseCase: FindOneTodoUseCase,
    private readonly updateTodoUseCase: UpdateTodoUseCase,
    private readonly removeTodoUseCase: RemoveTodoUseCase,
    private readonly softDeleteTodoUseCase: SoftDeleteTodoUseCase,
  ) {}

  /** POST /todos */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTodoDto) {
    return this.createTodoUseCase.execute(dto);
  }

  /** GET /todos?status=pending|in-progress|completed */
  @Get()
  findAll(@Query('status') status?: TodoStatus) {
    return this.findAllTodosUseCase.execute(status);
  }

  /** GET /todos/:id */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneTodoUseCase.execute(id);
  }

  /** PATCH /todos/:id */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.updateTodoUseCase.execute(id, dto);
  }

  /** DELETE /todos/:id — returns 204 No Content */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.removeTodoUseCase.execute(id);
  }

  /** PATCH /todos/:id/soft-delete */
  @Patch(':id/soft-delete')
  async softDelete(@Param('id') id: string) {
    const todo = await this.softDeleteTodoUseCase.execute(id);
    if (!todo) {
      return { statusCode: 404, message: 'Todo not found' };
    }
    return todo;
  }
}
