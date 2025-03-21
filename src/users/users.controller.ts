import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AddUserDto } from './dto/add-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async myProfile() {
    const data = await this.usersService.myProfile();
    return {
      status: 1,
      message: 'User Profile',
      data,
    };
  }

  @Put('profile')
  async update(@Body() updateUserDto: UpdateUserDto) {
    const response = await this.usersService.update(updateUserDto);
    return {
      message: 'user Updated',
      data: response,
    };
  }

  @Delete(':guid')
  @Roles(Role.Admin)
  remove(@Param('guid') guid: string) {
    return this.usersService.remove(guid);
  }

  @Get()
  @Roles(Role.Admin)
  async findAll() {
    const data = await this.usersService.findAll();
    return {
      status: 1,
      message: 'All users',
      data,
    };
  }

  @Post('/add')
  @Roles(Role.Admin)
  async addUser(@Body() userDetails: AddUserDto) {
    const data = await this.usersService.createUser(
      userDetails,
      userDetails.roles,
      true,
    );
    return {
      status: 1,
      message: 'User created successfully',
      data,
    };
  }

  @Get('roles')
  @Roles(Role.Admin)
  async getRolls() {
    const data = await this.usersService.getRoles();
    return {
      status: 1,
      message: 'all roles',
      data,
    };
  }
}
