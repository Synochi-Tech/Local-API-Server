import { ArgumentsHost, ExceptionFilter,  Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private configService: ConfigService) {}
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const isProduction = this.configService.get('NODE_ENV') === 'production' ? true: false

    response.status(503).json({
      status: 0,
      error: {
        message: exception.message,
        cause: !isProduction ? exception : {},
      },
      data: [],
      message: 'Global Exception error',
    });
  }
}
