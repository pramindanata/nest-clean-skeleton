import { JsonWebTokenError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import {
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTUtilContract } from '@/contracts';
import { AbilityFactory, User, UserUseCase, UtilDIToken } from '@/domain';
import { CookieName } from '../../constant';

@Injectable()
export class StateBuilder implements NestMiddleware {
  constructor(
    private userUseCase: UserUseCase,
    private abilityFactory: AbilityFactory,

    @Inject(UtilDIToken.JWTUtilContract)
    private jwtUtil: JWTUtilContract,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { cookies } = req;
    const user = await this.authenticate(cookies);

    req.state = {
      user,
      ability: this.abilityFactory.createForUser(user),
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
        throw new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'JWTException',
          message: err.message,
        });
      }

      throw err;
    }
  }
}
