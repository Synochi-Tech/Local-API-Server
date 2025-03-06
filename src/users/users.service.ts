import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { IRequest } from 'src/app.interface';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UserRoles } from './entities/userRole.entity';
import { AddUserDto } from './dto/add-user.dto';
import { ICreateUser } from './users.interface';
import { Role } from './entities/role.entitiy';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(UserRoles)
    private userRolesRepo: Repository<UserRoles>,

    @InjectRepository(Role)
    private roleRepo: Repository<Role>,

    @Inject(REQUEST)
    private request: IRequest,
  ) {}

  async findAll() {
    return await this.userRepo.find({
      relations: ['roles', 'roles.role'],
      select: {
        guid: true,
        first_name: true,
        last_name: true,
        email: true,
        mobile: true,
        created_at: true,
        created_by: true,
        roles: {
          role_id: true,
          role: {
            role: true,
          },
        },
      },
    });
  }

  async myProfile() {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .where('user.guid = :guid', { guid: this.request.user.guid })
      .getOne();
    if (user) {
      return {
        guid: user.guid,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        roles: user.roles.map((userRole) => ({
          role_id: userRole.role_id,
          role: userRole.role?.role, // Get the role name
        })),
      };
    }
  }

  async update(body: UpdateUserDto) {
    const updatedUser = {
      first_name: body.firstName,
      last_name: body.lastName,
    };
    return await this.userRepo.update(
      {
        guid: this.request.user.guid,
      },
      updatedUser,
    );
  }

  async remove(id: string) {
    return await this.userRepo.delete({ guid: id });
  }

  async createUser(
    properties: ICreateUser,
    roles: number[],
    isAdmin: boolean = false,
  ) {
    const userPassword = isAdmin
      ? Math.random().toString(36).slice(-8)
      : properties.password;

    const userGuid = uuidv4();

    const hashPassword = await bcrypt.hash(userPassword, 10);

    const user = this.userRepo.create({
      guid: userGuid,
      email: properties.email,
      mobile: properties.mobile,
      password: hashPassword,
      created_by: userGuid,
      username: properties.username,
      first_name: properties.first_name,
      last_name: properties.last_name,
    });

    await this.userRepo.save(user);

    const userRoles = roles.map((roleId) =>
      this.userRolesRepo.create({
        role_id: roleId,
        user_guid: user.guid,
        created_by: user.guid,
      }),
    );

    await this.userRolesRepo.save(userRoles);
    const response: {
      success: number;
      userGuid: string;
      password?: any;
    } = {
      success: 1,
      userGuid,
    };
    if (isAdmin) {
      response.password = userPassword;
    }
    return response;
  }

  async getRoles() {
    return this.roleRepo.find();
  }
}
