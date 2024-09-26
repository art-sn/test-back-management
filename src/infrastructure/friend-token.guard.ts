import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class FriendTokenGuard implements CanActivate {
  protected FRIEND_TOKEN_HEADER_NAME = 'friend-token';

  constructor() {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers[this.FRIEND_TOKEN_HEADER_NAME];

    return token === process.env.FRIEND_TOKEN;
  }
}
