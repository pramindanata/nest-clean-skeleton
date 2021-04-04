import Joi from 'joi';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { RequestPayloadSchema } from '@/infra/app/shared';

@Injectable()
export class GetArticlesSchema implements RequestPayloadSchema {
  async get(ctx: ExecutionContext, joi: Joi.Root): Promise<Joi.ObjectSchema> {
    return joi.object({
      search: joi
        .string()
        .optional()
        .empty('')
        .trim(),
      sort: joi
        .string()
        .optional()
        .valid('DESC', 'ASC')
        .uppercase(),
      order: joi
        .string()
        .optional()
        .valid('title', 'createdAt'),
      page: joi.number().optional(),
    });
  }
}
