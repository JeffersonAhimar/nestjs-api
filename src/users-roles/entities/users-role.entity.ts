import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './../../users/entities/user.entity';
import { Role } from './../../roles/entities/role.entity';

@Entity({ name: 'users_roles' })
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.usersRoles)
  user: User;

  @ManyToOne(() => Role, (role) => role.usersRoles)
  role: Role;

  // timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
