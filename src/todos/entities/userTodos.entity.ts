import { Todos } from 'src/todos/entities/todo.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_todos')
export class UserTodos {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'guid',
  })
  @Index()
  user: User;

  @ManyToOne(() => Todos, (todo) => todo.users)
  @JoinColumn({
    name: 'todo_id',
    referencedColumnName: 'id',
  })
  @Index()
  todos: Todos;
}
