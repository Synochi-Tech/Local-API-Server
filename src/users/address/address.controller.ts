import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dto/create-address-dto';
import { UpdateAddressDTO } from './dto/update-address-dto';

@Controller('users/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getAddress() {
    const data = await this.addressService.getUserAddress();
    return {
      status: 1,
      message: 'All Address fetched',
      data,
    };
  }

  @Post()
  async postAddress(@Body() body: CreateAddressDTO) {
    const data = await this.addressService.addUserAddress(body);
    return {
      status: 1,
      message: 'Address added Successfully',
      data,
    };
  }

  @Put('/update/:address_id')
  async putAddress(
    @Body() body: UpdateAddressDTO,
    @Param('address_id') addressId: string,
  ) {
    const data = await this.addressService.updateUserAddress(body, addressId);
    return {
      status: 1,
      message: 'Address updated successfully',
      data,
    };
  }
}
