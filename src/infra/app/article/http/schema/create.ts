import Joi from 'joi';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { RequestPayloadSchema } from '@/infra/app/shared';

@Injectable()
export class CreateArticleSchema implements RequestPayloadSchema {
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