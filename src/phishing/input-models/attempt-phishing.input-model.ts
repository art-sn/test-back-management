import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AttemptPhishingInputModel {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
