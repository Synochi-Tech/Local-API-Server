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
import { AssignTodoDto } from './dto/assign-todo-dto';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';

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
  async findOne(@Param() params: TodoParam) {
    const result = await this.todosService.findOne(params.id);
    return {
      message: `Todo Fetched for ${params.id}`,
      data: result,
    };
  }

  @Patch(':id')
  async update(
    @Param() params: TodoParam,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const result = await this.todosService.update(params.id, updateTodoDto);
    return {
      message: 'Todo Updated',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param() params: TodoParam) {
    const result = await this.todosService.remove(params.id);
    return {
      data: result,
      message: `Todo with id ${params.id} is deleted`,
    };
  }

  @Patch('assign-user/:id')
  @Roles(Role.Admin)
  async assignTodo(@Param() params: TodoParam, @Body() body: AssignTodoDto) {
    const result = this.todosService.assignUser(params.id, body.userId);
    return {
      data: result,
      message: 'User assigned successfully'
    }
  }
}
