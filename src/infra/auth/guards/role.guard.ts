import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { z } from 'zod';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
  user: z.object({
    role: z.nativeEnum(UserRole),
  }),
});

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

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
      const payload = await this.jwtService.verifyAsync(token);

      request['user'] = payload;
      const userHasPermision = requiredRoles.includes(payload.user.role);
      // console.log({
      //   userHasPermision,
      //   userRole: payload.user.role,
      //   requiredRoles
      // });

      return userHasPermision;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
