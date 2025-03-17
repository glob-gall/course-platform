import { HttpException, HttpStatus } from '@nestjs/common';

interface HttpErrorProps {
  code: HttpStatus;
  message: string;
}
export class HttpError extends HttpException {
  constructor({ code, message }: HttpErrorProps) {
    super({message},code)
  }
}
