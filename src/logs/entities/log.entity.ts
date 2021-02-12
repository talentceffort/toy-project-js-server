import { IsEnum } from 'class-validator';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum Operation {
  INSERT = 'insert',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum ObjectName {
  user = 'user',
  post = 'post',
}

// 파티션에 대해 알아보자.
export class LogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Operation,
  })
  @IsEnum(Operation)
  row_type: Operation;

  @Column({
    type: 'enum',
    enum: ObjectName,
  })
  object: ObjectName;

  @Column()
  field_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  old_value: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  new_value: string;

  @CreateDateColumn()
  log_date: Date;
}
