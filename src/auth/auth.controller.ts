import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  @Public()
  async signup(@Body() body: CreateUserDto) {
    const response = await this.authService.signup(body);
    return {
      status: 1,
      message: 'User created successfully',
      data: response,
    };
  }
  @Post('login')
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


