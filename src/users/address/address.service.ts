import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Addresses } from './entities/address.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { IRequest } from 'src/app.interface';
import { CreateAddressDTO } from './dto/create-address-dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAddressDTO } from './dto/update-address-dto';
import { UserAddress } from './entities/userAddress.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Addresses)
    private addressRepo: Repository<Addresses>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(UserAddress)
    private userAddressRepo: Repository<UserAddress>,

    @Inject(REQUEST)
    private request: IRequest,

    private dataSource: DataSource
  ) {}
  async getUserAddress() {
    return await this.addressRepo.find({
      where: {
        userAddress: {
          user_id: this.request.user.guid
        }
      }
    });
  }

  async addUserAddress(properties: CreateAddressDTO) {
    const addressGuid = uuidv4();
    const address = new Addresses();
    address.line_no_1 = properties.lineNo1;
    address.line_no_2 = properties.lineNo2;
    address.landmark = properties.landmark;
    address.city = properties.city;
    address.phone_number = properties.phoneNumber;
    address.pincode = properties.pincode;
    address.created_by = this.request.user.guid;
    address.state_id = properties.stateId;
    address.guid = addressGuid;

    const addressesResp =  await this.addressRepo.save(address);

    const userAddress = new UserAddress()
    const addressExit = await this.userAddressRepo.count({where:{user_id: this.request.user.guid}});

    userAddress.address_id = addressGuid
    userAddress.user_id = this.request.user.guid
    userAddress.is_default =  addressExit >= 1 ? false : true

    const userAddressResp = await this.userAddressRepo.save(userAddress)

    return {
      addressesResp,
      userAddressResp
    }
  }

  async updateUserAddress(properties: UpdateAddressDTO, addressId: string) {
    const address = new Addresses();
    address.line_no_1 = properties.lineNo1;
    address.line_no_2 = properties.lineNo2;
    address.landmark = properties.landmark;
    address.city = properties.city;
    address.phone_number = properties.phoneNumber;
    address.pincode = properties.pincode;
    address.updated_by = this.request.user.guid;
    address.updated_at = new Date();
    address.state_id = properties.stateId;

    return await this.addressRepo.update({ guid: addressId }, address);
  }
}
