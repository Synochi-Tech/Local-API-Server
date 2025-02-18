import { Request } from 'express';
import { Role } from './enums/role.enum';

export interface IRequest extends Request {
  user: IUser;
}

export interface IUser {
  guid: string;
  email: string;
  mobile: string;
  username: string;
  roles: IUserRoles[];
}

export interface IUserRoles {
  id: number;
  role: {
    id: number;
    role: Role;
  };
}
