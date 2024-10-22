import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Post } from '../../posts/entities/post.entity';
import { UserRole } from './../../users-roles/entities/users-role.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string; // encrypted

  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword() {
  //   if (!this.password) return;
  //   this.password = await bcrypt.hash(this.password, 10);
  // }

  @Index() // selected frequently
  @Exclude()
  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  refreshToken: string; // encrypted

  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashRefreshToken() {
  //   if (!this.refreshToken) return;
  //   this.refreshToken = await bcrypt.hash(this.refreshToken, 10);
  // }

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
