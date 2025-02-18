import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator"



export class UpdateCartDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number
}

export class AddToCartDTO extends UpdateCartDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;
}