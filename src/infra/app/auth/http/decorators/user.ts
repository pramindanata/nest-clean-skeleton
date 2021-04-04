import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as DomainUser } from '@/domain';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): DomainUser | undefined => {
    const req = ctx.switchToHttp().getRequest<Request>();

    return req.state.user;
  },
);
