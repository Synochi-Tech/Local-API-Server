import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDTO {
  @IsString()
  @IsNotEmpty()
  lineNo1: string;

  @IsString()
  @IsOptional()
  lineNo2: string;

  @IsString()
  landmark: string;

  @IsString()
  city: string;

  @IsNumber()
  stateId: number;

  @IsNumber()
  pincode: number;

  @IsNumber()
  phoneNumber: number;
}
