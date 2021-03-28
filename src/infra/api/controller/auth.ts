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
  User as DomainUser,
  UserUseCase,
  UtilDIToken,
} from '@/domain';
import { CookieName } from '../constant';
import { User, ValidSchema } from '../decorators';
import { LoginBodySchema, RegisterBodySchema } from '../schemas';

@Controller()
export class AuthController {
  constructor(
    private userUseCase: UserUseCase,

    @Inject(UtilDIToken.JWTUtilContract)
    private jwtUtil: JWTUtilContract,
  ) {}

  @Post('/login')
  @HttpCode(200)
  @ValidSchema({ body: LoginBodySchema })
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
  @HttpCode(200)
  @ValidSchema({ body: RegisterBodySchema })
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
  async me(@User() user: DomainUser): Promise<any> {
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
