import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from '../chats/chats.module';
import { ChatsController } from 'src/chats/chats.controller';
import { UsersModule } from 'src/users/users.module';
import { HeartDiseaseModule } from 'src/models/heart-disease/heart-disease.module';

@Module({
  imports: [ChatsModule, UsersModule],
  controllers: [ChatsController],
  providers: [AppService],
})
export class AppModule {}
