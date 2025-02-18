import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { IRequest } from 'src/app.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @Inject(REQUEST)
    private request: IRequest
  ) {}

  async findAll() {
    return await this.userRepo.find({
      relations:['roles','roles.role'],
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
            role: true
          }
        }
      }
    })
  }

  async myProfile() {
    return await this.userRepo.findOne({
      where: {
        guid: this.request.user.guid
      },
      relations: ['roles','roles.role'],
      select:{
        guid: true,
        email: true,
        first_name: true,
        last_name: true,
        roles: {
          role_id: true,
          role: {
            role: true
          }
        }
      }
    })
  }

  async update(body: UpdateUserDto) {
    const updatedUser = {
      first_name: body.firstName,
      last_name: body.lastName
    }
    return await this.userRepo.update({
      guid: this.request.user.guid
    },updatedUser)
  }

  async remove(id: string) {
    return await this.userRepo.delete({ guid: id });
  }

  
}
