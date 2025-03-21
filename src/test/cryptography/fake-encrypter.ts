import { Encrypter } from '@/domain/user-system/application/cryptography/encrypter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
