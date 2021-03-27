import { Module } from '@nestjs/common';
import { CryptUtil } from './crypt';

@Module({
  providers: [CryptUtil],
})
export class UtilModule {}
