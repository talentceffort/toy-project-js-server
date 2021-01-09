import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
@Entity() // Type ORM에서 사용 가능.
export class User extends CoreEntity {
  @Column()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userId: string;

  @Column()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @Column()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  firstName: string;

  @Column()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  lastName: string;

  @Column({
    default: true,
  })
  @IsBoolean()
  status: boolean;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
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
