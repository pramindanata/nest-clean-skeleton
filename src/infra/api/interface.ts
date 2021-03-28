import Joi from 'joi';
import { ExecutionContext } from '@nestjs/common';

export interface RequestPayloadSchema {
  get(ctx: ExecutionContext, joi: Joi.Root): Promise<Joi.ObjectSchema>;
}
