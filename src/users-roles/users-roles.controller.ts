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
import { ApiTags } from '@nestjs/swagger';

import { UsersRolesService } from './users-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

// JwtAuthGuard(@Public) -> RolesGuard(@Roles) -> ...
@ApiTags('users-roles')
@Controller('users-roles')
export class UsersRolesController {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  // @Roles(RoleEnum.ADMIN)
  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.usersRolesService.create(createUserRoleDto);
  }

  @Get()
  findAll() {
    return this.usersRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersRolesService.findOne(id);
  }

  @Get(':id/details')
  findOneWithRelations(@Param('id', ParseIntPipe) id: number) {
    return this.usersRolesService.findOneWithRelations(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.usersRolesService.update(id, updateUserRoleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersRolesService.remove(id);
  }
}
