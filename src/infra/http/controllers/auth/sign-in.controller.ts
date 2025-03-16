import { Role } from '@/domain/course-platform/entities/enums/roles.enum';
import { AuthService } from '@/infra/auth/auth.service';
import { Public } from '@/infra/decorators/public.decorator';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
interface AuthTestProps {
  email: string;
  password: string;
  role?: Role;
}

@Controller('/auth')
export class SignInController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  @Public()
  async siginIn(
    @Body() { email, password, role }: AuthTestProps,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.register({
      email,
      password,
      role: role ?? Role.Student,
    });

    const { token } = await this.authService.signin({
      email,
      password,
    });

    response.cookie('user-token', token, { httpOnly:true });
    return { token };
  }
}
