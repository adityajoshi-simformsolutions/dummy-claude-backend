import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { TodoStatus } from '../../domain/enums/todo-status.enum';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(200, { message: 'Title cannot exceed 200 characters' })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000, { message: 'Description cannot exceed 1000 characters' })
  description?: string;

  /** ISO date string, e.g. "2025-12-31" or "2025-12-31T00:00:00.000Z" */
  @IsDateString({}, { message: 'dueDate must be a valid ISO date string' })
  @IsNotEmpty({ message: 'Due date is required' })
  dueDate: string;

  @IsEnum(TodoStatus, {
    message: `status must be one of: ${Object.values(TodoStatus).join(', ')}`,
  })
  @IsOptional()
  status?: TodoStatus;
}
