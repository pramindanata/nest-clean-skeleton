import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AppAbility } from '@/domain';

export const Ability = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AppAbility => {
    const req = ctx.switchToHttp().getRequest<Request>();

    return req.state.ability;
  },
);
