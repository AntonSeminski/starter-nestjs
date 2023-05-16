import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class Datadog {
  httpTransportOptions = {
    host: process.env.DATADOG_SITE,
    path: '/api/v2/logs?dd-api-key=' + process.env.DATADOG_API_KEY +'&ddsource=nodejs&service=logger',
    ssl: true
  };

  logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
      new transports.Http(this.httpTransportOptions)
    ]
  });

    getAllLogs() {
      return [];
    }

    postDatadogLog(message, messageContext) {
      this.logger.info(message, messageContext);
      return true;
    }
}
