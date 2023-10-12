import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id'
  })
  id!: string;

  @Column({
    unique: true,
    type: 'varchar',
    name: 'login'
  })
  login!: string;

  @Column({
    name: 'password',
    type: 'varchar'
  })
  password!: string;

  @Column({
    name: 'age',
    type: 'int'
  })
  age!: number;

  @Column({
    name: 'is_deleted',
    type: 'boolean'
  })
  isDeleted!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
