import { Controller, Request, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    const user = req.user as User;
    return this.authService.login(user);
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    const user = req.user as User;
    return this.authService.refresh(user.id);
  }

  @Post('logout')
  async logout(@Request() req) {
    const user = req.user as User;
    return this.authService.logout(user.id);
  }
}
