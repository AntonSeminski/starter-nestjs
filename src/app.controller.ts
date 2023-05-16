import { Controller, UseGuards, Bind, Get, Post, Req, Inject } from "@nestjs/common";
import { AppService } from './app.service';
import rawbody from 'raw-body';
import { SfIntegrationGuard } from './sf-integration/sf-integration.guard';

@Controller('logger')
@UseGuards(SfIntegrationGuard)
export class AppController {
  @Inject(AppService) appService: AppService;

  @Get('/')
  hello() {
    return this.appService.hello();
  }

  @Get('getLogs')
  getAllLogs() {
    return this.appService.getAllLogs();
  }

  @Post('postLog')
  @Bind(Req())
  async postLog(req) {
    const raw = await rawbody(req);
    const text = raw.toString().trim();
    return this.appService.postLog(text, req.headers["iv"]);
  }
}
