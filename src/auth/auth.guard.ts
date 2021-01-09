import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // console.log(context);
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    // console.log(validateRequest(request);)
    console.log(request.user);
    return false;
  }
}
