import { CommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import {
  PhishingAttempt,
  PhishingAttemptStatuses,
} from '../schemas/PhishingAttempt.schema';

export class ConfirmPhishingAttemptCommand {
  constructor(public data: { id: string }) {}
}

@CommandHandler(ConfirmPhishingAttemptCommand)
export class ConfirmPhishingUseCase {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingAttemptModel: Model<PhishingAttempt>,
  ) {}

  async execute(cmd: ConfirmPhishingAttemptCommand) {
    const {
      data: { id },
    } = cmd;
    const phishingAttemptEntity = await this.phishingAttemptModel
      .findById(new mongo.ObjectId(id))
      .exec();

    if (!phishingAttemptEntity) {
      throw new Error('not found');
    }

    phishingAttemptEntity.status = PhishingAttemptStatuses.success;

    await phishingAttemptEntity.save();
  }
}
