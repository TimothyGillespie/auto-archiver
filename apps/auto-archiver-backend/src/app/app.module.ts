import { Module } from '@nestjs/common';

import {NestYoutubeApiModule} from "@auto-archiver/nest-youtube-api";
import {AppController} from "./app.controller";
import {DataController} from "./data.controller";

@Module({
  imports: [NestYoutubeApiModule.forRoot({
      clientId: '837125289109-sgfnfup1kk06gmctph9pjajv8al8su4t.apps.googleusercontent.com',
      clientSecret: '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',
      typeOrmConfig: {
          type: 'mariadb',
          // @ts-ignore
          host: 'localhost',
          port: 3306,
          username: 'auto-archiver',
          password: 'password',
          database: 'auto-archiver',
          synchronize: true,
      }
  })],
  controllers: [AppController, DataController],
  providers: [],
})
export class AppModule {}
