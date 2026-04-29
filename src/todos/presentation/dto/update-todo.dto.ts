import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

/**
 * All fields from CreateTodoDto are optional here.
 * PartialType re-applies all class-validator decorators with IsOptional.
 */
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
