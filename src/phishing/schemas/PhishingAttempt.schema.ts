import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type PhishingAttemptDocument = HydratedDocument<PhishingAttempt>;

export enum PhishingAttemptStatuses {
  pending = 'pending',
  success = 'success',
}
@Schema()
export class PhishingAttempt {
  @Prop({ required: true })
  email: string;

  @Prop({ type: String, enum: PhishingAttemptStatuses, required: true })
  status: PhishingAttemptStatuses;

  @Prop()
  emailContent: string;

  @Prop({ default: now() })
  createdAt: Date;
}

export const PhishingAttemptSchema =
  SchemaFactory.createForClass(PhishingAttempt);
