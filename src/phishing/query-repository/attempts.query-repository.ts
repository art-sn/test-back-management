import { InjectModel } from '@nestjs/mongoose';
import { PhishingAttempt } from '../schemas/PhishingAttempt.schema';
import { Model } from 'mongoose';

export class AttemptsQueryRepository {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingAttemptModel: Model<PhishingAttempt>,
  ) {}

  async getAll() {
    return this.phishingAttemptModel.find();
  }
}
