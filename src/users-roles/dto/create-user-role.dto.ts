import { PartialType } from '@nestjs/swagger';

export class CreateUserRoleDto {}

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {}
