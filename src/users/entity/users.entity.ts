import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, IsNull } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

export enum SignUpType {
  Local = 'local',
  Google = 'google',
}

@Entity() // Type ORM에서 사용 가능.
export class User extends CoreEntity {
  @Column()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login_id: string;

  @Column({ nullable: true })
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @Column()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  first_name: string;

  @Column()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  last_name: string;

  @Column({
    default: true,
  })
  @IsBoolean()
  status: boolean;

  @Column({
    type: 'enum',
    enum: SignUpType,
  })
  @IsEnum(SignUpType)
  signup_type: SignUpType;

  @Column({ nullable: true })
  @IsOptional()
  last_login: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      if (this.signup_type === 'local') {
        this.password = await bcrypt.hash(this.password, 10);
      }
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(paramPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(paramPassword, this.password);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
