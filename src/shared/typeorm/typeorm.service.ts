import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
      username: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      database: this.config.get('DB_NAME'),
      logging: this.config.get('ALLOW_LOGGING'),
      entities: [],
      autoLoadEntities: true,
      synchronize: this.config.get('DB_SYNC'),
      debug: false,
    };
  }
}
