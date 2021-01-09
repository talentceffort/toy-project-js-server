import { OmitType, PickType } from '@nestjs/mapped-types';
import { User } from '../entity/users.entity';

export class CreateUserDto extends OmitType(User, [
  'id',
  'status',
  'createdAt',
  'updatedAt',
]) {}

export class LoginInput extends PickType(User, ['userId', 'password']) {}
