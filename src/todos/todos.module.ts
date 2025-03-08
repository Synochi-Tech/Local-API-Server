import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './entities/todo.entity';
import { UserTodos } from './entities/userTodos.entity';
import { User } from 'src/users/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Todos,UserTodos,User])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
