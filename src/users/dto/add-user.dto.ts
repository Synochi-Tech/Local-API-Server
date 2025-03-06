import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt, Max, Min } from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class AddUserDto extends OmitType(CreateUserDto, ['password'] as const) {
  @ApiProperty({ type: [Number], description: 'List of role IDs' })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  roles: number[];
}
