import { Injectable } from '@nestjs/common';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from './dto/create-user-role.dto';

@Injectable()
export class UsersRolesService {
  create(createUserRoleDto: CreateUserRoleDto) {
    return 'This action adds a new usersRole';
  }

  findAll() {
    return `This action returns all usersRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersRole`;
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return `This action updates a #${id} usersRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersRole`;
  }
}
