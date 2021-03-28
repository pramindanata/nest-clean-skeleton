import { Ctor } from '@/core/interface';
import { SetMetadata } from '@nestjs/common';
import { MetadataKey } from '../constant';
import { RequestPayloadSchema } from '../interface';

export const Schema = (options: SchemaOptions) =>
  SetMetadata(MetadataKey.SCHEMAS, options);

export type SchemaOptions = {
  params?: Ctor<RequestPayloadSchema>;
  query?: Ctor<RequestPayloadSchema>;
  body?: Ctor<RequestPayloadSchema>;
};
