import { Role } from '@/domain/course-platform/entities/enums/roles.enum';
import { Roles } from './roles.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { TokenPayload } from './guards/role.guard';
import { Public } from './public.decorator';
// import { CurrentUser } from './current-user.decorator';
// import { TokenPayload } from './jwt.strategy';

interface AuthTestProps {
  email: string;
  password: string;
  role: Role;
}

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  @Public()
  async siginIn(@Body() { email, password, role }: AuthTestProps) {
    await this.authService.register({
      email,
      password,
      role,
    });

    const response = await this.authService.signin({
      email,
      password,
    });

    return response;
  }

  @Post('/admin')
  @Roles(Role.Admin)
  async admin(@CurrentUser() user: TokenPayload) {
    console.log({ user });
  }

  @Post('/student')
  @Roles(Role.Student)
  async student(@CurrentUser() user: TokenPayload) {
    console.log({ user });
  }

  @Post('/course-owner')
  @Roles(Role.CourseOwner)
  async courseOwner(@CurrentUser() user: TokenPayload) {
    console.log({ user });
  }

  @Post('/public')
  @Public()
  async public(@CurrentUser() user: TokenPayload) {
    console.log({ user });
  }
}
