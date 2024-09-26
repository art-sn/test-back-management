import { Module } from '@nestjs/common';
import { PhishingModule } from './phishing/phishing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from './infrastructure/emails/email.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    PhishingModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    EmailModule,
  ],
})
export class AppModule {}
