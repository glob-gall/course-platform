import { EnvModule } from '@/infra/env/env.module';
import { EnvService } from '@/infra/env/env.service';
import { AssasPaymentService } from '@/infra/payment-system/assas-payment-.service';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

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
  providers: [AssasPaymentService],
  exports: [AssasPaymentService],
})
export class PaymentModule {}
