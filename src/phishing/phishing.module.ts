import { Module } from '@nestjs/common';
import { PhishingController } from './phishing.controller';
import { AttemptPhishingUseCase } from './use-cases/AttemptPhishingUseCase';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from './schemas/PhishingAttempt.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { AttemptsQueryRepository } from './query-repository/attempts.query-repository';
import { ConfirmPhishingUseCase } from './use-cases/ConfirmPhishingAttempt';

const useCases = [AttemptPhishingUseCase, ConfirmPhishingUseCase];

const schemas = [{ name: PhishingAttempt.name, schema: PhishingAttemptSchema }];
const repositories = [AttemptsQueryRepository];
@Module({
  imports: [MongooseModule.forFeature(schemas), CqrsModule],
  controllers: [PhishingController],
  providers: [...useCases, ...repositories],
})
export class PhishingModule {}
