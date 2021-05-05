import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './controllers';
import { AppService } from './services';
import { dbConfig } from './config';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
