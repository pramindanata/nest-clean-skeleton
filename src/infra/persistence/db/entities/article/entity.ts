import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ORMUser } from '../user';
import { TableName } from '../../constant';

@Entity({
  name: TableName.ARTICLE,
})
export class ORMArticle {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: string;

  @Column()
  title!: string;

  @Column({
    type: 'text',
  })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    type: 'bigint',
  })
  authorId!: string;

  @ManyToOne(() => ORMUser)
  author?: ORMUser;
}
