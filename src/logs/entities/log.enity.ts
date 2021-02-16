import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Operation {
  INSERT = 'insert',
  UPDATE = 'update',
  DELETE = 'delete',
  SELECT = 'select',
}

export enum ObjectName {
  user = 'user',
  post = 'post',
}

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  HTTP = 'http',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
  SILLY = 'silly',
}

// 파티션에 대해 알아보자.
@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Operation,
    nullable: true,
  })
  @IsEnum(Operation)
  @IsOptional()
  row_type: Operation;

  @Column({
    type: 'enum',
    enum: ObjectName,
  })
  @IsEnum(ObjectName)
  object: ObjectName;

  @Column({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  field_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @IsOptional()
  old_value: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @IsOptional()
  new_value: string;

  @Column({
    type: 'enum',
    enum: LogLevel,
  })
  @IsEnum(LogLevel)
  log_level: string;

  @Column({
    type: 'text',
  })
  message: string;

  @CreateDateColumn()
  @IsDate()
  log_date: Date;
}
