import { Public } from '@/infra/decorators/public.decorator';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { FetchManyLectureUsecase } from '@/domain/lecture-system/application/use-cases/fetch-many-lectures.usecase';
import { LecturePresenter } from '../../presenters/lecture.presenter';

@Controller('/lecture')
export class fetchManyLecturesController {
  constructor(private fetchManyLectures: FetchManyLectureUsecase) {}

  @Get()
  @Public()
  async siginIn() {
    const result = await this.fetchManyLectures.exec();

    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
    return {
      lectures: result.value.lectures.map(LecturePresenter.toHTTP)
    }
  }
}
