import { Inject, Injectable } from "@nestjs/common";
import { createDecipheriv } from 'crypto';
import { Datadog } from "./datadog/datadog";

@Injectable()
export class AppService {
  @Inject(Datadog) datadogService: Datadog;

  hello():string {
    return 'who am i';
  }

  getAllLogs() {
    return this.datadogService.getAllLogs();
  }

  postLog(logDto, ivHex) {
    const encryptedData = Buffer.from(logDto, 'hex');
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(process.env.SF_PRIVATE_KEY, 'hex'), Buffer.from(ivHex, 'hex'));

    let decrypted = decipher.update(encryptedData.toString(), 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    try {
      const jsonLogDto = JSON.parse(decrypted);
      const message = jsonLogDto["message"];
      const messageContext = {
        orgId: jsonLogDto["orgId"],
        processName: jsonLogDto["processName"],
        stackTrace: jsonLogDto["processName"],
      }

      return this.datadogService.postDatadogLog(message, messageContext);
    } catch (error) {
      return;
    }
  }
}
