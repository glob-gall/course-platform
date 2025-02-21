import { Role } from '@/domain/course-platform/entities/enums/roles.enum';
import { Injectable } from '@nestjs/common';

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
export abstract class AuthServiceInterface {
  abstract register(user: User);
  abstract signin(signInProps: SignInProps): Promise<{ token: string }>;
}
