import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { ROLE_ID } from 'src/users/constants';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  @Public()
  async signup(@Body() body: CreateUserDto) {
    const response = await this.userService.createUser(body, [ROLE_ID.USER]);
    return {
      status: 1,
      message: 'User created successfully',
      data: response,
    };
  }
  @Post('signin')
  @Public()
  async login(@Body() body: LoginUserDto) {
    const response = await this.authService.login(body);
    return {
      status: 1,
      message: 'Login Successful ',
      data: response,
    };
  }
}
