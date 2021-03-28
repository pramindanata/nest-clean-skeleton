import { applyDecorators, UseGuards } from '@nestjs/common';
import { SchemaValidationGuard } from '../guards';
import { Schema, SchemaOptions } from './schema';

export const ValidSchema = (options: SchemaOptions) =>
  applyDecorators(Schema(options), UseGuards(SchemaValidationGuard));
