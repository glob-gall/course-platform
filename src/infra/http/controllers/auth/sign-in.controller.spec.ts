import { IAuthenticateUserUsecase } from '@/domain/user-system/application/use-cases/authenticate-user.usecase';
import { SignInController } from './sign-in.controller';
import { FakePaymentService } from '@/test/services/fake-payment-service';
import { FakeAuthenticateUserUsecase } from '@/test/use-cases/user-system/fake-authenticate-user';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PaymentService } from '@/domain/product-system/payment-service/payment.service';
import { ValidationFilter } from '@/infra/validation/validation-filter';

describe('sign-in controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SignInController],
      providers: [
        {
          provide: IAuthenticateUserUsecase,
          useClass: FakeAuthenticateUserUsecase,
        },
        {
          provide: PaymentService,
          useClass: FakePaymentService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new ValidationFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('it should be able to sign-in', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({
        email: 'email@fake.true',
        password: 'password',
      });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('user-token=fake-token'),
      ]),
    );
  });

  it('it should be able to validate the fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({});

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.errors).toEqual(
      expect.objectContaining({
        email: expect.anything(),
        password: expect.anything(),
      }),
    );
  });
});
