import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.SuperAdmin)
  async findAll() {
    const data = await this.usersService.findAll();
    return {
      status: 1,
      message: 'User created successfully',
      data,
    };
  }

  @Get('profile')
  async myProfile() {
    const data = await this.usersService.myProfile();
    return {
      status: 1,
      message: 'User Profile',
      data,
    };
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) {
    const response = await this.usersService.update(updateUserDto);
    return {
      message: 'user Updated',
      data: response,
    };
  }

  @Delete(':guid')
  @Roles(Role.SuperAdmin)
  remove(@Param('guid') guid: string) {
    return this.usersService.remove(guid);
  }
}
