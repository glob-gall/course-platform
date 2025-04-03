import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  NewCustomerRequest,
  NewCustomerResponse,
} from './types/create-customer';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  CreateChargeRequest,
  CreateChargeResponse,
} from './types/create-charge';
import {
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
} from './types/create-subscription';

@Injectable()
export class AssasHttpService {
  private readonly logger = new Logger(AssasHttpService.name);
  constructor(private readonly asaasHttpAccess: HttpService) {}

  async newCustomer({
    cpfCnpj,
    email,
    name,
  }: NewCustomerRequest): Promise<NewCustomerResponse> {
    const { data } = await firstValueFrom(
      this.asaasHttpAccess
        .post<NewCustomerResponse>('/v3/customers', { cpfCnpj, email, name })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  async newCharge({
    billingType,
    customer,
    dueDate,
    value,
  }: CreateChargeRequest): Promise<CreateChargeResponse> {
    const { data } = await firstValueFrom(
      this.asaasHttpAccess
        .post<CreateChargeResponse>('/v3/payments', {
          billingType,
          customer,
          dueDate,
          value,
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  async newSubscription({
    billingType,
    customer,
    cycle,
    nextDueDate,
    value,
  }: CreateSubscriptionRequest): Promise<CreateSubscriptionResponse> {
    const { data } = await firstValueFrom(
      this.asaasHttpAccess
        .post<CreateSubscriptionResponse>('/v3/subscriptions', {
          billingType,
          customer,
          cycle,
          nextDueDate,
          value,
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }
}
