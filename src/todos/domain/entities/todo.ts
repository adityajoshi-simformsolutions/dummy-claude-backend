import { ObjectId } from 'mongodb';
import { TodoStatus } from '../enums/todo-status.enum';

export class Todo {
  id: ObjectId;
  title: string;
  description?: string;
  dueDate: Date;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
