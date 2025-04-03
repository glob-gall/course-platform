import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { left } from '@/core/types/either';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { PaymentProfileAlreadyExistsError } from './error/payment-profile-already-exists.error';
import {
  CreateChargeParams,
  CreateSubscriptionParams,
  CreateUserParams,
  PaymentService,
} from '@/domain/product-system/payment-service/payment.service';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { AssasPaymentHttpService } from './assas-payment-http.service';

@Injectable()
export class AssasPaymentService implements PaymentService {
  constructor(
    private prisma: PrismaService,
    private readonly asaasHttpAccess: AssasPaymentHttpService,
  ) {}

  async createUser({ cpf, email }: CreateUserParams): Promise<unknown> {
    const paymentProfile = await this.prisma.assasPaymentProfile.findUnique({
      where: { cpf },
    });
    if (paymentProfile) return left(new PaymentProfileAlreadyExistsError());

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return left(new ResourceNotFoundError());

    const newAssasUser = await this.asaasHttpAccess.newCustomer({
      cpfCnpj: cpf,
      email,
      name: user.name,
    });

    this.prisma.assasPaymentProfile.create({
      data: {
        id: new UniqueEntityID().toString(),
        asaasId: newAssasUser.id,
        cpf,
        userId: user.id,
      },
    });
  }

  async createCharge({
    paymentType,
    userId,
    value,
  }: CreateChargeParams): Promise<unknown> {
    const paymentProfile = await this.prisma.assasPaymentProfile.findUnique({
      where: { userId },
    });
    if (!paymentProfile) {
      return left(new ResourceNotFoundError());
    }

    this.asaasHttpAccess.newCharge({
      billingType: paymentType,
      customer: paymentProfile.asaasId,
      dueDate: new Date(),
      value,
    });
  }

  async createSubscription({
    customerId,
    cycle,
    paymentType,
    value,
  }: CreateSubscriptionParams): Promise<unknown> {
    const paymentProfile = await this.prisma.assasPaymentProfile.findUnique({
      where: { userId: customerId },
    });
    if (!paymentProfile) {
      return left(new ResourceNotFoundError());
    }

    this.asaasHttpAccess.newSubscription({
      billingType: paymentType,
      customer: paymentProfile.asaasId,
      cycle,
      nextDueDate: new Date(),
      value,
    });
  }
}
