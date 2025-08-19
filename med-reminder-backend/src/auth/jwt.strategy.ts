/* eslint-disable */
/* prettier-ignore */

/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly secret: string;

  constructor(config: ConfigService<Record<string, any>>) {
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const secret = config.get<string>('JWT_SECRET');

    if (typeof secret !== 'string' || !secret) {
      throw new Error('JWT_SECRET is missing or not a string');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}
