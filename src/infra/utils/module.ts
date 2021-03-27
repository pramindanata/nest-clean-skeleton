import { UtilDIToken } from '@/domain';
import { Global, Module } from '@nestjs/common';
import { CryptUtil } from './crypt';
import { JWTUtil } from './jwt';

@Global()
@Module({
  providers: [
    {
      provide: UtilDIToken.JWTUtilContract,
      useClass: JWTUtil,
    },
    {
      provide: UtilDIToken.CryptUtilContract,
      useClass: CryptUtil,
    },
  ],
  exports: [UtilDIToken.JWTUtilContract, UtilDIToken.CryptUtilContract],
})
export class UtilModule {}
