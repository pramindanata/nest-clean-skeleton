import { Response } from 'express';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { JWTUtilContract, UserUseCase, UtilDIToken } from '@/domain';
import { CookieName } from '../constant';

@Controller()
export class AuthController {
  constructor(
    private userUseCase: UserUseCase,

    @Inject(UtilDIToken.JWTUtilContract)
    private jwtUtil: JWTUtilContract,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginBody, @Res() res: Response): Promise<any> {
    const user = await this.userUseCase.login(body);
    const token = await this.jwtUtil.create({
      sub: user.id,
    });

    return res.cookie(CookieName.TOKEN, token, { httpOnly: true }).json({
      message: 'OK',
    });
  }

  @Post('/register')
  async register(
    @Body() body: RegisterBody,
    @Res() res: Response,
  ): Promise<any> {
    const user = await this.userUseCase.register(body);
    const token = await this.jwtUtil.create({
      sub: user.id,
    });

    return res.cookie(CookieName.TOKEN, token, { httpOnly: true }).json({
      message: 'OK',
    });
  }
}

interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody {
  email: string;
  password: string;
  name: string;
}
