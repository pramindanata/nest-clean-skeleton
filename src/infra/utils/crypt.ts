import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CryptUtilContract } from '@/contracts';

@Injectable()
export class CryptUtil implements CryptUtilContract {
  async hash(text: string): Promise<string> {
    const maxSalt = 10;
    const salt = await bcrypt.genSalt(maxSalt);
    const hash = await bcrypt.hash(text, salt);

    return hash;
  }

  async validate(text: string, hash: string): Promise<boolean> {
    const valid = await bcrypt.compare(text, hash);

    return valid;
  }
}
