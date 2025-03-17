import { HashComparer } from '@/domain/user-system/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/user-system/application/cryptography/hash-generator';
import { compare, hash } from 'bcryptjs';

export class BcryptHasher implements HashComparer, HashGenerator {
  private salt = 8;

  async hash(plain: string): Promise<string> {
    return hash(plain, this.salt);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
