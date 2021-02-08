import { OmitType, PickType } from '@nestjs/mapped-types';
import { User } from '../entities/users.entity';

export class CreateUserDto extends OmitType(User, [
  'id',
  'status',
  'createdAt',
  'updatedAt',
  'checkPassword',
  'hashPassword',
  'last_login',
]) {}

export class CreateOAuthDto extends OmitType(CreateUserDto, ['password']) {}

export class LoginInput extends PickType(User, ['login_id', 'password']) {}

export class googleLoginInput extends PickType(User, [
  'login_id',
  'first_name',
  'last_name',
]) {}
export class LoginOutput extends OmitType(User, [
  'password',
  'checkPassword',
  'hashPassword',
]) {}
