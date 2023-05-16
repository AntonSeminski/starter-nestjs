import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Datadog } from './datadog/datadog';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService, Datadog],
})
export class AppModule {}
