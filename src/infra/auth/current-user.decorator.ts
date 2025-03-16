import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from './guards/role.guard';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.cookies); // or "request.cookies['cookieKey']"
    console.log({ user: request.cookies['@course-plataform:token'] });

    return request.user as TokenPayload;
  },
);
