import Joi from 'joi';
import { ExecutionContext } from '@nestjs/common';
import { RequestPayloadSource } from './constant';

export interface RequestPayloadSchema {
  getSource(): RequestPayloadSource;
  getSchema(ctx: ExecutionContext, joi: Joi.Root): Promise<Joi.ObjectSchema>;
}
