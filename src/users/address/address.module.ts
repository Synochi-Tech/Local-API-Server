import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Addresses } from './entities/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserAddress } from './entities/userAddress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Addresses,User,UserAddress]),],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
