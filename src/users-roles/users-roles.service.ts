import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRole } from './entities/users-role.entity';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
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

  async create(createUserRoleDto: CreateUserRoleDto) {
    await this.usersService.findOne(createUserRoleDto.userId);
    await this.rolesService.findOne(createUserRoleDto.roleId);

    const newUserRole = this.userRoleRepository.create(createUserRoleDto);
    return this.userRoleRepository.save(newUserRole);
  }

  findAll() {
    return this.userRoleRepository.find();
  }

  async findOne(id: number) {
    const userRole = await this.userRoleRepository.findOne({ where: { id } });
    if (!userRole) {
      throw new NotFoundException('UserRole not found');
    }
    return userRole;
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    const userRole = await this.findOne(id);

    if (updateUserRoleDto.userId) {
      await this.usersService.findOne(updateUserRoleDto.userId);
    }
    if (updateUserRoleDto.roleId) {
      await this.rolesService.findOne(updateUserRoleDto.roleId);
    }

    this.userRoleRepository.merge(userRole, updateUserRoleDto);
    return this.userRoleRepository.save(userRole);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    return this.userRoleRepository.remove(post);
  }
}
