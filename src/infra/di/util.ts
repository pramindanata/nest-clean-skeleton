import { Global, Module } from '@nestjs/common';
import { UtilDIToken } from '@/domain';
import { CryptUtil, JWTUtil } from '../utils';

@Global()
@Module({
  providers: [
    {
      provide: UtilDIToken.CryptUtilContract,
      useClass: CryptUtil,
    },
    {
      provide: UtilDIToken.JWTUtilContract,
      useClass: JWTUtil,
    },
  ],
  exports: [UtilDIToken.CryptUtilContract, UtilDIToken.JWTUtilContract],
})
export class UtilModule {}
