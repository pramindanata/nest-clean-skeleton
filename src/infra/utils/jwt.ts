import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JWTPayload, JWTUtilContract } from '@/contracts';
import { ConfigVariables } from '@/core/config';

@Injectable()
export class JWTUtil implements JWTUtilContract {
  constructor(private configService: ConfigService<ConfigVariables>) {}

  create(payload: JWTPayload): Promise<string> {
    const host = this.configService.get<string>('app.host');
    const secret = this.configService.get<string>('app.secret');

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secret,
        {
          issuer: host,
          expiresIn: '15m',
        },
        (err, token) => {
          if (err) {
            return reject(err);
          }

          return resolve(token!);
        },
      );
    });
  }

  verify(token: string): Promise<JWTPayload> {
    const secret = this.configService.get<string>('app.secret');

    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, {}, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        return resolve(decoded as JWTPayload);
      });
    });
  }
}
