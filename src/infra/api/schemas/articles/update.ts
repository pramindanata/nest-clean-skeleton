import Joi from 'joi';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { RequestPayloadSchema } from '../../interface';

@Injectable()
export class UpdateArticleBodySchema implements RequestPayloadSchema {
  async get(ctx: ExecutionContext, joi: Joi.Root): Promise<Joi.ObjectSchema> {
    return joi.object({
      title: joi
        .string()
        .required()
        .trim(),
      description: joi
        .string()
        .required()
        .trim(),
    });
  }
}