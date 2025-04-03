import { EnvModule } from '@/infra/env/env.module';
import { EnvService } from '@/infra/env/env.service';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AssasPaymentService } from './asaas/assas-payment-.service';
import { AssasHttpService } from './asaas/assas-http.service';
import { PaymentService } from '@/domain/product-system/payment-service/payment.service';

@Module({
  imports: [
    AxiosHttpModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (env: EnvService) => ({
        timeout: 5000,
        baseURL: env.get('ASAAS_BASE_URL'),
        headers: {
          Accept: 'application/json',
          access_token: env.get('ASAAS_PRIVATE_KEY'),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: PaymentService,
      useClass: AssasPaymentService,
    },
    AssasHttpService,
  ],
  exports: [AssasPaymentService],
})
export class PaymentModule {}
