import { Either, left, right } from '@/core/types/either';
import { Subscription } from '../../entities/subscription.entity';
import { SubscriptionsRepository } from '../repositories/subscriptions.repository';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { CoursesRepository } from '@/domain/course-platform/application/repositories/courses.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { PaymentCycle } from '../../entities/enum/payment_cycle';
import { Injectable } from '@nestjs/common';

interface CreateSubscriptionRequest {
  title: string;
  description?: string | null;
  courses: string[];
  cycle: PaymentCycle;
  priceInCents: number;
}

type CreateSubscriptionResponse = Either<
  ResourceNotFoundError,
  { subscription: Subscription }
>;

@Injectable()
export class CreateSubscriptionUsecase {
  constructor(
    private subscriptionsRepository: SubscriptionsRepository,
    private coursesRepository: CoursesRepository,
  ) {}

  async exec({
    priceInCents,
    courses,
    cycle,
    title,
    description,
  }: CreateSubscriptionRequest): Promise<CreateSubscriptionResponse> {
    const findedCourses = await this.coursesRepository.findManyByIds(courses);
    if (courses.length !== findedCourses.length)
      return left(new ResourceNotFoundError());

    const subscription = Subscription.create({
      cycle,
      priceInCents,
      description,
      title,
      courses: courses.map((courseId) => new UniqueEntityID(courseId)),
    });

    await this.subscriptionsRepository.create(subscription);
    return right({ subscription });
  }
}
