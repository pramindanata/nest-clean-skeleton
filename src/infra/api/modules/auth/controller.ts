import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import {
  JWTUtilContract,
  User as UserEntity,
  UserUseCase,
  UtilDIToken,
} from '@/domain';
import { CookieName, ValidSchema } from '../shared';
import { LoginSchema, RegisterSchema } from './schema';
import { Auth, Guest, User } from './decorators';

@Controller()
export class AuthController {
  constructor(
    private userUseCase: UserUseCase,

    @Inject(UtilDIToken.JWTUtilContract)
    private jwtUtil: JWTUtilContract,
  ) {}

  @Post('/login')
  @Guest()
  @HttpCode(200)
  @ValidSchema({ body: LoginSchema })
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
  @Guest()
  @HttpCode(200)
  @ValidSchema({ body: RegisterSchema })
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

  @Get('/me')
  @Auth()
  async me(@User() user: UserEntity): Promise<any> {
    return {
      data: user,
    };
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
