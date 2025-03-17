import { HashComparer } from '@/domain/user-system/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/user-system/application/cryptography/hash-generator';

export class FakeHasher implements HashComparer, HashGenerator {
  async hash(plain: string): Promise<string> {
    return `${plain}-hashed`;
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return !!plain.concat('-hashed').localeCompare(hash);
  }
}
