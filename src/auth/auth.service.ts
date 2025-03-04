import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRoles } from 'src/users/entities/userRole.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { ROLE_ID } from 'src/users/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(UserRoles)
    private userRolesRepo: Repository<UserRoles>,

    private jwtService: JwtService,

    private configService: ConfigService,
  ) {}

  async signup(properties: CreateUserDto) {
    const hashPassword = await bcrypt.hash(properties.password, 10);
    const userGuid = uuidv4();

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

    const userRoles = [];

    userRoles.push(
      this.userRolesRepo.create({
        role_id: ROLE_ID.USER,
        user_guid: user.guid,
        created_by: user.guid,
      }),
    );

    await this.userRolesRepo.save(userRoles);

    return {
      success: 1,
    };
  }
  async login(body: LoginUserDto) {
    // find user
    const user = await this.userRepo.findOne({
      where: [{ email: body.username }, { username: body.username }],
    });
    if (!user) {
      throw new NotFoundException('User not found with this username / email');
    }
    // verify password
    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Email or password is wrong');
    }
    // return jwt token
    const token = await this.jwtService.sign(
      {
        id: user.guid,
        roles: user.roles,
      },
      { secret: this.configService.get('SECRET_KEY') },
    );
    return {
      token,
    };
  }

  async findOne(id: string) {
    return await this.userRepo.findOne({
      where: { guid: id },
      relations: ['roles', 'roles.role'],
      select: {
        guid: true,
        email: true,
        first_name: true,
        last_name: true,
        mobile: true,
        username: true,
        roles: {
          id: true,
          user_guid: true,
          role_id: true,
          role: {
            id: true,
            role: true,
          },
        },
      },
    });
  }
}
