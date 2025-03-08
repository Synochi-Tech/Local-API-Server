import { IsOptional, IsString, isString, IsUUID } from 'class-validator';

export class AssignTodoDto {
  @IsString()
  @IsUUID()
  userId: string;
}
