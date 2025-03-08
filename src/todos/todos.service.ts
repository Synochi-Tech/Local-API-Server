import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto, TodoParam } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserTodos } from './entities/userTodos.entity';
import { REQUEST } from '@nestjs/core';
import { IRequest } from 'src/app.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @Inject(REQUEST)
    private request: IRequest,

    @InjectRepository(Todos)
    private todoRepo: Repository<Todos>,

    @InjectRepository(UserTodos)
    private userTodosRepo: Repository<UserTodos>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private dataSource: DataSource,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    const todoId = uuid();
    const createdTodo = this.todoRepo.create({
      id: todoId,
      title: createTodoDto.title,
      isCompleted: createTodoDto.isCompleted,
    });
    const userTodo = this.userTodosRepo.create({
      user: { guid: this.request.user.guid },
      todos: todoId,
    });
    return Promise.all([
      this.todoRepo.save(createdTodo),
      this.userTodosRepo.save(userTodo),
    ]);
  }

  async findAll() {
    const result = await this.todoRepo.find({
      relations: ['users', 'users.user'],
      select: {
        id: true,
        title: true,
        isCompleted: true,
        created_at: true,
        users: {
          id: true, // how we can add alias for this id key
          user: {
            first_name: true,
            last_name: true,
            username: true,
          },
        },
      },
      where: {
        users: {
          user: {
            guid: this.request.user.guid,
          },
        },
      },
    });
    return result;
  }

  findOne(id: string) {
    return this.todoRepo.findOne({
      where: {
        id,
      },
      relations: ['users', 'users.user'],
      select: {
        id: true,
        title: true,
        isCompleted: true,
        created_at: true,
        users: {
          user: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return await this.todoRepo.update(
      {
        id,
      },
      { ...updateTodoDto, updated_at: new Date() },
    );
  }

  async remove(id: string) {
    return await this.todoRepo.delete({
      id,
    });
  }

  async assignUser(id: string, userId: string) {
    return await this.dataSource.transaction(async (manager) => {
      const todo = await manager.findOne(Todos, {
        where: { id },
        relations: ['users'],
      });

      const user = await manager.findOne(User, { where: { guid: userId } });

      if (!todo || !user) {
        throw new NotFoundException('Invalid Todo or User ID');
      }

      if (!todo.users) {
        throw new NotFoundException('UserTodo mapping not found');
      }

      await manager.update(UserTodos, todo.users.id, { user });

      await manager.update(Todos, id, {
        updated_at: new Date(),
        updated_by: this.request.user.guid,
      });

      return { message: 'User assigned successfully' };
    });
  }
}
