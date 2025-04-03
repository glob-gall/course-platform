import { Public } from '@/infra/decorators/public.decorator';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { FetchManyQuestionsUsecase } from '@/domain/quizz-system/application/use-cases/fetch-many-question.usecase';
import { QuestionPresenter } from '../../presenters/question.presenter';

@Controller('/question')
export class fetchManyQuestionsController {
  constructor(private fetchManyQuestions: FetchManyQuestionsUsecase) {}

  @Get()
  @Public()
  async get() {
    const result = await this.fetchManyQuestions.exec({});

    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
    return {
      questions: result.value.questions.map(QuestionPresenter.toHTTP),
    };
  }
}
