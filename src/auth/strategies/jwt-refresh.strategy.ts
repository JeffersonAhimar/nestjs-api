import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import config from 'src/config';
import { PayloadToken } from '../models/token.model';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtRefreshSecret, // validate jwt refresh token
      passReqToCallback: true, // to access to request
    });
  }

  async validate(req: Request, payload: PayloadToken) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    const userId = payload.sub;
    // return payload;
    const user = await this.authService.validateUserRefreshToken(
      userId,
      refreshToken,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
    return user;
  }
}
