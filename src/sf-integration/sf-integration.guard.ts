import { CanActivate, Injectable } from "@nestjs/common";

@Injectable()
export class SfIntegrationGuard implements CanActivate{
  canActivate(context) {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(req) {
    return req.headers['auth'] === process.env.SF_PUBLIC_KEY;
  }
}
