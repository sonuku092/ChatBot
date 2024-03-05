import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from '../chats/chats.module';
import { ChatsController } from 'src/chats/chats.controller';

@Module({
  imports: [ChatsModule],
  controllers: [ChatsController],
  providers: [AppService],
})
export class AppModule {}
