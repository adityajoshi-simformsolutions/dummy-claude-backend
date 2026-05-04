import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '../../domain/enums/todo-status.enum';

export class TodoResponseDto {
  @ApiProperty({ description: 'Unique identifier of the todo', example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ description: 'Title of the todo', example: 'Complete project documentation' })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the todo',
    example: 'Write comprehensive documentation for the API',
    required: false,
    nullable: true,
  })
  description?: string;

  @ApiProperty({ description: 'Due date of the todo', example: '2026-05-31T00:00:00.000Z' })
  dueDate: Date;

  @ApiProperty({ description: 'Current status of the todo', enum: TodoStatus, example: TodoStatus.PENDING })
  status: TodoStatus;

  @ApiProperty({ description: 'Timestamp when the todo was created', example: '2026-05-01T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the todo was last updated', example: '2026-05-01T10:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Timestamp when the todo was soft deleted; null if not deleted',
    example: null,
    required: false,
    nullable: true,
  })
  deletedAt?: Date | null;
}
