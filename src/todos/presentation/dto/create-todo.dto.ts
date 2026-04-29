import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '../../domain/enums/todo-status.enum';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Title of the todo',
    example: 'Complete project documentation',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(200, { message: 'Title cannot exceed 200 characters' })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the todo',
    example: 'Write comprehensive documentation for the API',
    maxLength: 1000,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000, { message: 'Description cannot exceed 1000 characters' })
  description?: string;

  @ApiProperty({
    description: 'Due date in ISO format (YYYY-MM-DD or ISO 8601)',
    example: '2026-05-31',
  })
  @IsDateString({}, { message: 'dueDate must be a valid ISO date string' })
  @IsNotEmpty({ message: 'Due date is required' })
  dueDate: string;

  @ApiProperty({
    description: 'Status of the todo',
    enum: TodoStatus,
    example: TodoStatus.PENDING,
    required: false,
  })
  @IsEnum(TodoStatus, {
    message: `status must be one of: ${Object.values(TodoStatus).join(', ')}`,
  })
  @IsOptional()
  status?: TodoStatus;
}
