import { IsOptional, IsString, isString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsOptional()
  isCompleted: boolean;
}

export class TodoParam {
  @IsString()
  id: string;
}
