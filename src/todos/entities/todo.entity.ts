import { UserTodos } from 'src/todos/entities/userTodos.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class Todos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    default: false,
  })
  isCompleted: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updated_at: Date;

  @OneToMany(() => UserTodos, (todo) => todo.todos)
  todos: UserTodos[];
}
