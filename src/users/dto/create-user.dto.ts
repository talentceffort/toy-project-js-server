import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString({ each: true })
  hobbies: string[];
}
