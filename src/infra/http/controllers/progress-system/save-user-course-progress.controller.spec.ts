import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ValidationFilter } from '@/infra/validation/validation-filter';
import { saveUserCourseProgressController } from './save-user-course-progress.controller';
import { ISaveUserCourseProgressUsecase } from '@/domain/progress-system/application/use-cases/save-user-course-progress.usecase';
import { FakeSaveUserCourseProgress } from '@/test/use-cases/progress-system/fake-authenticate-user';
import { FakeRolesGuard } from '@/test/guards/fake-roles-guard';
import { getFakeUserTokenCookie } from '@/test/utils/fake-user-token-cookie';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { APP_GUARD } from '@nestjs/core';
import cookieParser from 'cookie-parser';

describe('save-user-course-progress controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [saveUserCourseProgressController],
      providers: [
        {
          provide: ISaveUserCourseProgressUsecase,
          useClass: FakeSaveUserCourseProgress,
        },
        {
          provide: APP_GUARD,
          useClass: FakeRolesGuard,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    app.useGlobalFilters(new ValidationFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('it should be able to update user-course progress', async () => {
    const cookies = await getFakeUserTokenCookie(UserRole.Student);

    const response = await request(app.getHttpServer())
      .post('/course/course-id/section-item-id')
      .send({
        concluded: true,
      })
      .set('Cookie', cookies);

    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it('it should be able to validate the fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/course/course-id/section-item-id')
      .send({
        concluded: true,
      });

    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });
});
