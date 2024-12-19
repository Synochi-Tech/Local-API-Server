import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, TodoParam } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const result = await this.todosService.create(createTodoDto);
    return {
      message: 'Todo Created',
      data: result,
    };
  }

  @Get()
  async findAll() {
    const result = await this.todosService.findAll();
    return {
      data: result,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const result = await this.todosService.update(id, updateTodoDto);
    return {
      message: 'Todo Updated',
      data: result
    }
  }

  @Delete(':id')
  async remove(@Param() params: TodoParam) {
    const result = await this.todosService.remove(params.id);
    return {
      data: result,
      message: `Todo with id ${params.id} is deleted`
    }
  }
}
