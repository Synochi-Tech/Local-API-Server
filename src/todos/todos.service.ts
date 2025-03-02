import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto, TodoParam } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserTodos } from './entities/userTodos.entity';
import { REQUEST } from '@nestjs/core';
import { IRequest } from 'src/app.interface';

@Injectable()
export class TodosService {
  constructor(
    @Inject(REQUEST)
    private request: IRequest,

    @InjectRepository(Todos)
    private todoRepo: Repository<Todos>,

    @InjectRepository(UserTodos)
    private userTodosRepo: Repository<UserTodos>,
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
}
