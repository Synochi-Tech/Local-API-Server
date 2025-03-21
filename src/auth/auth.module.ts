import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserRoles } from 'src/users/entities/userRole.entity';
import { Role } from 'src/users/entities/role.entitiy';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRoles, Role])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
