import { Public } from '@/infra/decorators/public.decorator';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { FetchManyQuizzesUsecase } from '@/domain/quizz-system/application/use-cases/fetch-many-quizz.usecase';
import { QuizzPresenter } from '../../presenters/quizz.presenter';

@Controller('/quizz')
export class fetchManyQuizzesController {
  constructor(private fetchManyQuizzes: FetchManyQuizzesUsecase) {}

  @Get()
  @Public()
  async get() {
    const result = await this.fetchManyQuizzes.exec();

    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
    return {
      quizzes: result.value.quizzes.map(QuizzPresenter.toHTTP)
    }
  }
}
