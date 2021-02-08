import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/users.entity';

export enum PostType {
  default = 'default',
}

@Entity()
export class Post extends CoreEntity {
  @Column({
    type: 'enum',
    enum: PostType,
    default: PostType.default,
  })
  @IsEnum(PostType)
  post_type: PostType;

  @Column({ default: true })
  @IsBoolean()
  status: true;

  @Column({ type: 'text' })
  @IsString()
  @MaxLength(2000)
  content: string;

  @Column({ default: false })
  @IsBoolean()
  isEdited: false;

  @Column({ default: 0 })
  @IsNumber()
  like_count: number;

  @Column({ default: 0 })
  @IsNumber()
  comment_count: number;

  @IsNumber()
  @ManyToOne(() => User, (user) => user.posts)
  user: number;
}
