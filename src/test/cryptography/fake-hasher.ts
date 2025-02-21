import { HashComparer } from '@/domain/course-platform/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/course-platform/application/cryptography/hash-generator';

export class FakeHasher implements HashComparer, HashGenerator {
  async hash(plain: string): Promise<string> {
    return `${plain}-hashed`;
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return !!plain.concat('-hashed').localeCompare(hash);
  }
}
