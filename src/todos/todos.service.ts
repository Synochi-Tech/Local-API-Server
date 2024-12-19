import { Injectable } from '@nestjs/common';
import { CreateTodoDto, TodoParam } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todoRepo: Repository<Todos>,
  ) {}
  create(createTodoDto: CreateTodoDto) {
    return this.todoRepo.save(createTodoDto);
  }

  async findAll() {
    return await this.todoRepo.find();
  }

  findOne(id: string) {
    return this.todoRepo.findOne({
      where: {
        id,
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
