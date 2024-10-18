import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
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
  create(@Body() payload: CreateUserRoleDto) {
    return this.usersRolesService.create(payload);
  }

  @Get()
  findAll() {
    return this.usersRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersRolesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserRoleDto,
  ) {
    return this.usersRolesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersRolesService.remove(id);
  }
}
