import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRolesService } from './users-roles.service';
import { UsersRolesController } from './users-roles.controller';
import { UserRole } from './entities/users-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [UsersRolesController],
  providers: [UsersRolesService],
})
export class UsersRolesModule {}
