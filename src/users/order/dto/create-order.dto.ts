import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  billAddressId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  shippingAddressId: string;
}
