import { Request } from 'express';
import { ValidationError, ValidationResult } from 'joi';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { joi } from '@/core/joi';
import { SchemaOptions } from '../decorators';
import { MetadataKey, RequestPayloadSource } from '../constant';
import { RequestPayloadSchema } from '../interface';

@Injectable()
export class SchemaValidationGuard implements CanActivate {
  constructor(private reflector: Reflector, private moduleRef: ModuleRef) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const { body, query, params } = req;
    const opts = this.reflector.get<SchemaOptions | undefined>(
      MetadataKey.SCHEMAS,
      ctx.getHandler(),
    );

    if (!opts) {
      throw new Error('SchemaOptions is empty');
    }

    if (opts.params) {
      const schema = this.moduleRef.get(opts.params);
      const result = await this.validate(ctx, schema, params, 'params');
      req.params = result.value;
    }

    if (opts.query) {
      const schema = this.moduleRef.get(opts.query);
      const result = await this.validate(ctx, schema, query, 'query');
      req.query = result.value;
    }

    if (opts.body) {
      const schema = this.moduleRef.get(opts.body);
      const result = await this.validate(ctx, schema, body, 'body');
      req.body = result.value;
    }

    return true;
  }

  private async validate(
    ctx: ExecutionContext,
    schema: RequestPayloadSchema,
    payload: any,
    source: RequestPayloadSource,
  ): Promise<ValidationResult> {
    const objectSchema = await schema.get(ctx, joi);
    const result = objectSchema.validate(payload);

    if (result.error) {
      const data = this.getInvalidData(result.error);

      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Unprocessable Entity',
        data: {
          invalid: data,
          source,
        },
      });
    }

    return result;
  }

  private getInvalidData(error: ValidationError): SchemaValidationInvalidData {
    const data: SchemaValidationInvalidData = error.details.reduce(
      (prev, cur) => {
        const key = cur.path.join('.');

        if (!prev[key]) {
          prev[key] = [];
        }

        prev[key].push({
          message: cur.message,
          context: cur.context,
        });

        return prev;
      },
      {} as SchemaValidationInvalidData,
    );

    return data;
  }
}

interface SchemaValidationInvalidData {
  [key: string]: {
    message: string;
    context: any;
  }[];
}
