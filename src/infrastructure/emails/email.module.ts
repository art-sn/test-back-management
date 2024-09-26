import { Global, Module } from '@nestjs/common';
import { EmailAdapter } from './email.adapter';

@Global()
@Module({
  providers: [EmailAdapter],
  exports: [EmailAdapter],
})
export class EmailModule {}
