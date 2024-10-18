import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from './dto/create-user-role.dto';

@Controller('users-roles')
export class UsersRolesController {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  @Post()
  create(@Body() createUsersRoleDto: CreateUserRoleDto) {
    return this.usersRolesService.create(createUsersRoleDto);
  }

  @Get()
  findAll() {
    return this.usersRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersRolesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersRoleDto: UpdateUserRoleDto,
  ) {
    return this.usersRolesService.update(+id, updateUsersRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersRolesService.remove(+id);
  }
}
