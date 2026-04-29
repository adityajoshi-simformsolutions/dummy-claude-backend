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
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBody, ApiExcludeEndpoint } from '@nestjs/swagger';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoStatus } from '../../domain/enums/todo-status.enum';
import { CreateTodoUseCase } from '../../application/use-cases/create-todo.use-case';
import { FindAllTodosUseCase } from '../../application/use-cases/find-all-todos.use-case';
import { FindOneTodoUseCase } from '../../application/use-cases/find-one-todo.use-case';
import { UpdateTodoUseCase } from '../../application/use-cases/update-todo.use-case';
import { RemoveTodoUseCase } from '../../application/use-cases/remove-todo.use-case';

import { SoftDeleteTodoUseCase } from '../../application/use-cases/soft-delete-todo.use-case';

@ApiTags('Todos')
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

  @ApiOperation({ summary: 'Create a new todo', description: 'Creates a new todo item with the provided details' })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 201, description: 'Todo created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTodoDto) {
    return this.createTodoUseCase.execute(dto);
  }

  @ApiOperation({ summary: 'Get all todos', description: 'Retrieve all todo items, optionally filtered by status' })
  @ApiQuery({ name: 'status', enum: TodoStatus, required: false, description: 'Filter todos by status' })
  @ApiResponse({ status: 200, description: 'List of todos retrieved successfully' })
  @Get()
  findAll(@Query('status') status?: TodoStatus) {
    return this.findAllTodosUseCase.execute(status);
  }

  @ApiOperation({ summary: 'Get a todo by ID', description: 'Retrieve a specific todo item by its ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the todo' })
  @ApiResponse({ status: 200, description: 'Todo retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneTodoUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Update a todo', description: 'Update an existing todo item with partial or complete data' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the todo' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Todo updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.updateTodoUseCase.execute(id, dto);
  }

  @ApiOperation({ summary: 'Delete a todo', description: 'Permanently delete a todo item (hard delete)' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the todo' })
  @ApiResponse({ status: 204, description: 'Todo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.removeTodoUseCase.execute(id);
  }

  @ApiExcludeEndpoint()
  @Patch(':id/soft-delete')
  async softDelete(@Param('id') id: string) {
    const todo = await this.softDeleteTodoUseCase.execute(id);
    if (!todo) {
      return { statusCode: 404, message: 'Todo not found' };
    }
    return todo;
  }
}
