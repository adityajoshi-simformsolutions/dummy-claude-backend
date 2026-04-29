import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { TodoStatus } from '../../domain/enums/todo-status.enum';

@Entity('todos')
export class TodoOrmEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  dueDate: Date;

  @Column({ default: TodoStatus.PENDING })
  status: TodoStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date | null;
}
