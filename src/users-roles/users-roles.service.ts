import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRole } from './entities/users-role.entity';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from './dto/create-user-role.dto';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  async create(data: CreateUserRoleDto) {
    await this.usersService.findOne(data.userId);
    await this.rolesService.findOne(data.roleId);

    const newUserRole = this.userRoleRepository.create(data);
    return this.userRoleRepository.save(newUserRole);
  }

  findAll() {
    return this.userRoleRepository.find();
  }

  async findOne(id: number) {
    const userRole = await this.userRoleRepository.findOne({
      where: { id },
      relations: ['user', 'role'],
    });
    if (!userRole) {
      throw new NotFoundException('UserRole not found');
    }
    return userRole;
  }

  async update(id: number, changes: UpdateUserRoleDto) {
    const userRole = await this.findOne(id);

    if (changes.userId) {
      const user = await this.usersService.findOne(changes.userId);
      userRole.user = user;
    }
    if (changes.roleId) {
      const role = await this.rolesService.findOne(changes.roleId);
      userRole.role = role;
    }

    this.userRoleRepository.merge(userRole, changes);
    return this.userRoleRepository.save(userRole);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    return this.userRoleRepository.remove(post);
  }
}
