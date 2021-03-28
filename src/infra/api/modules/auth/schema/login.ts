import Joi from 'joi';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { RequestPayloadSchema } from '../../shared';

@Injectable()
export class LoginSchema implements RequestPayloadSchema {
  async get(ctx: ExecutionContext, joi: Joi.Root): Promise<Joi.ObjectSchema> {
    return joi.object({
      email: joi
        .string()
        .email()
        .required()
        .trim(),
      password: joi
        .string()
        .required()
        .min(8),
    });
  }
}
