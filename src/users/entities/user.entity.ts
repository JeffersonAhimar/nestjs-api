import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from '../../posts/entities/post.entity';
import { UserRole } from './../../users-roles/entities/users-role.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; // encrypt

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  usersRoles: UserRole[];

  // timestamps
  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
