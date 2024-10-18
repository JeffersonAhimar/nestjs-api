import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateUserRoleDto {
  @IsPositive()
  @IsNotEmpty()
  readonly userId: number;

  @IsPositive()
  @IsNotEmpty()
  readonly roleId: number;
}

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {}
