import Joi from 'joi';
import { RequestPayloadSource } from '../../constant';
import { RequestPayloadSchema } from '../../interface';
import { ExecutionContext } from '@nestjs/common';

export class LoginBodySchema implements RequestPayloadSchema {
  getSource(): RequestPayloadSource {
    return 'body';
  }

  async getSchema(
    ctx: ExecutionContext,
    joi: Joi.Root,
  ): Promise<Joi.ObjectSchema> {
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
