import Joi from 'joi';
import { ExecutionContext } from '@nestjs/common';
import { AppAbility, User } from '@/domain';

export interface RequestPayloadSchema {
  get(ctx: ExecutionContext, joi: Joi.Root): Promise<Joi.ObjectSchema>;
}

export interface State {
  user?: User;
  ability?: AppAbility;
}
