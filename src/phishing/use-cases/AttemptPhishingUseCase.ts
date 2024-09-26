import { CommandHandler } from '@nestjs/cqrs';
import { AttemptPhishingInputModel } from '../input-models/attempt-phishing.input-model';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  PhishingAttempt,
  PhishingAttemptStatuses,
} from '../schemas/PhishingAttempt.schema';
import * as process from 'process';
import { EmailAdapter } from '../../infrastructure/emails/email.adapter';
import { EmailTemplates } from '../../infrastructure/emails/templates-metadata';

export class AttemptPhishingCommand {
  constructor(public data: AttemptPhishingInputModel) {}
}

@CommandHandler(AttemptPhishingCommand)
export class AttemptPhishingUseCase {
  constructor(
    private emailAdapter: EmailAdapter,
    @InjectModel(PhishingAttempt.name)
    private phishingAttemptModel: Model<PhishingAttempt>,
  ) {}

  async execute(cmd: AttemptPhishingCommand) {
    const { data } = cmd;
    const phishingAttempt = new this.phishingAttemptModel({
      email: data.email,
      status: PhishingAttemptStatuses.pending,
    });
    const phishingLink = this.generatePhishingLink(
      phishingAttempt._id.toString(),
    );

    const { content: emailContent } = await this.emailAdapter.sendMail(
      data.email,
      EmailTemplates.PHISHING,
      {
        phishingLink,
      },
    );

    phishingAttempt.emailContent = emailContent;

    await phishingAttempt.save();
  }

  generatePhishingLink(id: string) {
    return `${process.env.APP_DOMAIN}/phishing/${id}/confirm`;
  }
}
