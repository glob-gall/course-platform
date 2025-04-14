import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { ROLES_KEY } from '@/infra/decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '@/infra/decorators/public.decorator';

@Injectable()
export class FakeRolesGuard {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    const token = request.cookies['user-token'];
    if (!token) throw new UnauthorizedException();

    try {
      const payload = JSON.parse(token);
      request['user'] = payload;

      const userHasPermision = requiredRoles.includes(payload.user.role);
      return userHasPermision;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
