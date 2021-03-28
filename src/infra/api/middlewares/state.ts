import { NextFunction, Request, Response } from 'express';
import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTUtilContract, User, UserUseCase, UtilDIToken } from '@/domain';
import { CookieName } from '../constant';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class State implements NestMiddleware {
  constructor(
    private userUseCase: UserUseCase,

    @Inject(UtilDIToken.JWTUtilContract)
    private jwtUtil: JWTUtilContract,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { cookies } = req;
    const user = await this.authenticate(cookies);

    console.log(user);

    req.state = {
      user,
    };

    next();
  }

  private async authenticate(cookies: any): Promise<User | undefined> {
    if (!cookies[CookieName.TOKEN]) {
      return undefined;
    }

    try {
      const token = cookies[CookieName.TOKEN] as string;
      const tokenPayload = await this.jwtUtil.verify(token);
      const user = await this.userUseCase.getMe(tokenPayload.sub);

      return user;
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedException();
      }

      throw err;
    }
  }
}
