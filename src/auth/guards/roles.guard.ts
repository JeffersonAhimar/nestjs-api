import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';
import { UsersService } from 'src/users/users.service';
import { RoleEnum } from 'src/common/models/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<RoleEnum[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // no required roles = allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;

    // get roles from db
    const userWithRoles = await this.usersService.findOneWithRoles(user.sub);
    // format roles
    const userRoles = userWithRoles.usersRoles.map(
      (userRole) => userRole.role.name,
    );

    // validate roles
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
