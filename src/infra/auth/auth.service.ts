import { Role } from '@/domain/course-platform/entities/enums/roles.enum';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';

interface User {
  email: string;
  password: string;
  role: Role;
}
interface SignInProps {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private jwtService: JwtService) {}

  async register({ email, password, role }: User) {
    const hashedPassword = await hash(password, 8);
    const user: User = {
      email,
      password: hashedPassword,
      role,
    };

    this.users.push(user);
  }

  async signin({ email, password }: SignInProps) {
    const user = this.users.find((item) => item.email === email);
    if (!user) throw new UnauthorizedException();
    if (password !== password) throw new UnauthorizedException();

    const token = await this.jwtService.signAsync({
      sub: user.email,
      user: {
        role: user.role,
      },
    });

    return { token };
  }
}
