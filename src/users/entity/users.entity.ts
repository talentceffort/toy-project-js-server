import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Type ORM에서 사용 가능.
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userId: string;

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

  @Column()
  @IsDate()
  createdAt: Date;

  @Column({ nullable: true })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
