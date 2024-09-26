import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AttemptPhishingInputModel } from './input-models/attempt-phishing.input-model';
import { AttemptPhishingCommand } from './use-cases/AttemptPhishingUseCase';
import { ConfirmPhishingAttemptCommand } from './use-cases/ConfirmPhishingAttempt';
import { FriendTokenGuard } from '../infrastructure/friend-token.guard';
import { AttemptsQueryRepository } from './query-repository/attempts.query-repository';

@Controller('phishing')
export class PhishingController {
  constructor(
    private commandBus: CommandBus,
    private attemptsQueryRepository: AttemptsQueryRepository,
  ) {}

  @UseGuards(FriendTokenGuard)
  @Get('attempts')
  async getPhishingAttempts() {
    return this.attemptsQueryRepository.getAll();
  }

  @UseGuards(FriendTokenGuard)
  @Post('send')
  async attemptPhishing(
    @Body() attemptPhishingInputModel: AttemptPhishingInputModel,
  ) {
    return this.commandBus.execute(
      new AttemptPhishingCommand(attemptPhishingInputModel),
    );
  }

  @Get('/:id/confirm')
  async confirmPhishing(@Param('id') id: string) {
    await this.commandBus.execute(new ConfirmPhishingAttemptCommand({ id }));
  }
}
