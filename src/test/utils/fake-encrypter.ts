import { Encrypter } from '@/domain/user-system/application/cryptography/encrypter';
import { JwtService } from '@nestjs/jwt';

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    const jwtService = new JwtService();
    return jwtService.signAsync(payload);
  }
}
